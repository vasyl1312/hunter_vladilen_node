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

//для редагування курсів переходимо на саму сторінку
router.get('/:id/edit', async (req, res) => {
  //allow потім для розподілу між клієнтом і власником
  if (!req.query.allow) return res.redirect('/')

  const course = await Course.getById(req.params.id)

  res.render('courseEdit', { title: `Редагувати ${course.title}`, course })
})

//тут редагування
router.post('/edit', async (req, res) => {
  await Course.update(req.body)
  res.redirect('/courses')
})

//для оброблення route коли перейшли на --відкрити курс--
router.get('/:id', async (req, res) => {
  const course = await Course.getById(req.params.id)

  res.render('course', { layout: 'empty', title: `Курс ${course.title}`, course })
})

module.exports = router
