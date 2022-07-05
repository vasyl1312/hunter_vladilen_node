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
  const user = await User.findById('62bc2d54befb8d1927cb5214') //чекаємо певного користувача
  req.session.user = user //додаємо користувача
  req.session.isAuthenticated = true // для того щоб деякі могли міняти контент а деякі не мають дозволу
  req.session.save((err) => {
    if (err) {
      throw err
    }
    res.redirect('/')
  })
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
