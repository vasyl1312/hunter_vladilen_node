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

module.exports = router
