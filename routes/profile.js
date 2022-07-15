const { Router } = require('express')
const auth = require('../middleware/auth') //якщо користувач зареєстрований то доступні роути
const router = Router()

router.get('/', async (req, res) => {
  res.render('profile', {
    title: 'Профіль',
    isProfile: true, //для підсвітки коли на цій сторінці
    user: req.user.toObject(),
  })
})

router.post('/', async (req, res) => {})

module.exports = router
