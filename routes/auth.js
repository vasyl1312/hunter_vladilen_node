const { Router } = require('express')
const bcrypt = require('bcryptjs')
const crypto = require('crypto') //для рандом
const { validationResult } = require('express-validator/check')
const User = require('../models/user')
const keys = require('../keys')
const regEmail = require('../emails/registration')
const resetEmail = require('../emails/reset')
const router = new Router()
const sgMail = require('@sendgrid/mail')
const { registerValidators } = require('../utils/validators')

router.get('/login', async (req, res) => {
  res.render('auth/login', {
    title: 'Авторизація',
    isLogin: true,
    loginError: req.flash('loginError'),
    registerError: req.flash('registerError'),
  })
})

router.get('/logout', async (req, res) => {
  //ощичуємо сесію
  req.session.destroy(() => {
    res.redirect('/auth/login#login ')
  })
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const candidate = await User.findOne({ email }) //перевірка по email чи існує в нас такий користувач
    if (candidate) {
      const areSame = await bcrypt.compare(password, candidate.password) //перевірка чи співпадають паролі
      if (areSame) {
        req.session.user = candidate //додаємо користувача якщо все ок
        req.session.isAuthenticated = true // для того щоб деякі могли міняти контент а деякі не мають дозволу
        req.session.save((err) => {
          if (err) {
            throw err
          }
          res.redirect('/')
        })
      } else {
        req.flash('loginError', 'Неправильний пароль')
        res.redirect('/auth/login#login')
      }
    } else {
      req.flash('loginError', 'Такого користувача не існує') //коли при вході вводять не той email
      res.redirect('/auth/login#login')
    }
  } catch (e) {
    console.log(e)
  }
})

router.post('/register', registerValidators, async (req, res) => {
  try {
    const { email, password, name } = req.body //створюємо користувача по даних з форми

    const errors = validationResult(req) //якщо є помилки валідації то вивожимо
    if (!errors.isEmpty()) {
      req.flash('registerError', errors.array()[0].msg)
      return res.status(422).redirect('/auth/login#register')
    }
    //шифруємо пароль коли реєструємось, 10 це ніби рівень шифрування чим більше тим важче і довше
    const hashPassword = await bcrypt.hash(password, 10)
    //якщо користувача нема то реєcтруємо його
    const user = new User({
      email,
      name,
      password: hashPassword,
      cart: { items: [] },
    })
    sgMail.setApiKey(keys.API_KEY) //транспортер для відправлення по апі ключу сенд гріда емейл
    await user.save()
    res.redirect('/auth/login#login')
    await sgMail.send(regEmail(email)).catch((error) => {
      console.error(error)
    })
  } catch (e) {
    console.log(e)
  }
})

router.get('/reset', (req, res) => {
  res.render('auth/reset', {
    title: 'Забули пароль?',
    error: req.flash('error'),
  })
})

router.post('/reset', (req, res) => {
  try {
    //для самого скидання паролю(генеруємо рандом ключ і відправляємо на пошту користувачу якщо він за певний час перейде по посиланню і введе той код то можна ввести новий пароль)
    crypto.randomBytes(32, async (err, buffer) => {
      if (err) {
        req.flash('error', 'Щось пішло не так, спробуйте згодом...')
        return res.redirect('/auth/reset')
      }

      const token = buffer.toString('hex')
      const candidate = await User.findOne({ email: req.body.email }) //перевіряємо чи введений емейл є в базі

      if (candidate) {
        candidate.resetToken = token
        candidate.resetTokenExp = Date.now() + 60 * 60 * 1000 //1год буде жити токен
        await candidate.save()
        //і відсилаємо йому на email лист
        await sgMail.send(resetEmail(candidate.email, token)).catch((error) => {
          console.error(error)
        })
        res.redirect('/auth/login')
      } else {
        req.flash('error', 'Введеного email немає в базі, перевірте ще раз')
        res.redirect('/auth/reset')
      }
    })
  } catch (e) {
    console.log(e)
  }
})

router.get('/password/:token', async (req, res) => {
  if (!req.params.token) {
    return res.redirect('/auth/login')
  }

  try {
    const user = await User.findOne({
      resetToken: req.params.token,
      resetTokenExp: { $gt: Date.now() }, //перевірка чи час життя токена не сплинув
    }) //шукаємо користувача з таким токеном

    if (!user) {
      //якщо користувача не знайдено з токеном або час сплинув то все
      return res.redirect('/auth/login')
    } else {
      res.render('auth/password', {
        title: 'Оновити пароль',
        error: req.flash('error'),
        userId: user._id.toString(),
        token: req.params.token,
      })
    }
  } catch (e) {
    console.log(e)
  }
})

router.post('/password', async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.body.userId,
      resetToken: req.body.token,
      resetTokenExp: { $gt: Date.now() },
    }) //перевірка користувача

    if (user) {
      user.password = await bcrypt.hash(req.body.password, 10) //якщо користувача знайдено то міняємо пароль
      user.resetToken = undefined //видаляємо всі дані токена відновлення
      user.resetTokenExp = undefined
      await user.save()
      res.redirect('/auth/login')
    } else {
      req.flash('loginError', 'Час життя токена вичерпано')
      res.redirect('/auth/login')
    }
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
