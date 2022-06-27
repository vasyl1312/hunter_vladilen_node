const { Router } = require('express')
const Course = require('../models/course')
const router = Router()

router.get('/', (req, res) => {
  res.render('add', {
    title: 'Додати',
    isAdd: true, //для підсвітки коли на цій сторінці
  })
})

//щоб проробити результат після надсилання нового курсу
router.post('/', async (req, res) => {
  const course = new Course({
    title: req.body.title,
    price: req.body.price,
    img: req.body.img,
  })

  try {
    await course.save()
    res.redirect('/courses') //коли додали новий курс - редірект на всі курси
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
