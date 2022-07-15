const { Router } = require('express')
const multer = require('multer')
const auth = require('../middleware/auth') //якщо користувач зареєстрований то доступні роути
const User = require('../models/user')
const router = Router()

router.get('/', auth, async (req, res) => {
  res.render('profile', {
    title: 'Профіль',
    isProfile: true, //для підсвітки коли на цій сторінці
    user: req.user.toObject(),
  })
})

router.post('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    const toChange = {
      name: req.body.name,
    }

    console.log(req.file)
    //req.file undefined ????????/multer error or enctype='multipart/form-data
    if (req.file) {
      toChange.avatarUrl = req.file.path
    }

    Object.assign(user, toChange)
    await user.save()
    res.redirect('/profile')
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
