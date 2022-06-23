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
  const course = new Course(req.body.title, req.body.price, req.body.img)

  await course.save()

  res.redirect('/courses') //коли додали новий курс - редірект на всі курси
})

module.exports = router
