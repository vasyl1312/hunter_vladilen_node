const { Router } = require('express')
const Course = require('../models/course')
const auth = require('../middleware/auth') //якщо користувач зареєстрований то доступні роути
const router = Router()

router.get('/', auth, (req, res) => {
  res.render('add', {
    title: 'Додати',
    isAdd: true, //для підсвітки коли на цій сторінці
  })
})

//щоб проробити результат після надсилання нового курсу
router.post('/', auth, async (req, res) => {
  const course = new Course({
    title: req.body.title,
    price: req.body.price,
    img: req.body.img,
    userId: req.user,
  })

  try {
    await course.save()
    res.redirect('/courses') //коли додали новий курс - редірект на всі курси
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
