const { Router } = require('express')
const { validationResult } = require('express-validator/check')
const Course = require('../models/course')
const auth = require('../middleware/auth') //якщо користувач зареєстрований то доступні роути
const { courseValidators } = require('../utils/validators')
const router = Router()

router.get('/', auth, (req, res) => {
  res.render('add', {
    title: 'Додати',
    isAdd: true, //для підсвітки коли на цій сторінці
  })
})

//щоб проробити результат після надсилання нового курсу
router.post('/', auth, courseValidators, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).render('add', {
      title: 'Додати',
      isAdd: true, //для підсвітки коли на цій сторінці
      error: errors.array()[0].msg,
      data: {
        title: req.body.title, //для того коли пишемо назву курсу і протупили в ціні то щоб назва не стиралась
        price: req.body.price,
        img: req.body.img,
      },
    })
  }

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
