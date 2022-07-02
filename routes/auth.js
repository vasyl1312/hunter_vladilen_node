const { Router } = require('express')
const router = new Router()

router.get('/login', async (req, res) => {
  res.render('auth/login', {
    title: 'Авторизація',
    isLogin: true,
  })
})

module.exports = router
