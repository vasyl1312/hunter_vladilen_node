const { Router } = require('express')
const User = require('../models/user')
const router = new Router()

router.get('/login', async (req, res) => {
  res.render('auth/login', {
    title: 'Авторизація',
    isLogin: true,
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
      const areSame = password === candidate.password //перевірка чи співпадають паролі
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
        res.redirect('/auth/login#login')
      }
    } else {
      res.redirect('/auth/login#login')
    }
  } catch (e) {
    console.log(e)
  }
})

router.post('/register', async (req, res) => {
  try {
    const { email, password, repeat, name } = req.body //створюємо користувача по даних з форми
    const candidate = await User.findOne({ email }) //перевірка чи існує користувач з таким email
    if (candidate) {
      res.redirect('/auth/login#register')
    } else {
      //якщо користувача нема то реємтруємо його
      const user = new User({
        email,
        name,
        password,
        cart: { items: [] },
      })
      await user.save()
      res.redirect('/auth/login#login')
    }
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
