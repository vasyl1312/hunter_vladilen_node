const { Router } = require('express')
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
  req.session.isAuthenticated = true // для того щоб деякі могли міняти контент а деякі не мають дозволу
  res.redirect('/')
})

module.exports = router
