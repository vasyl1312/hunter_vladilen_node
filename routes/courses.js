const { Router } = require('express')
const Course = require('../models/course')
const router = Router()

router.get('/', async (req, res) => {
  const courses = await Course.getAll()
  res.render('courses', {
    title: 'Курси',
    isCourses: true, //для підсвітки коли на цій сторінці
    courses,
  })
})

module.exports = router
