const { Router } = require('express')
const Course = require('../models/course')
const router = Router()

router.get('/', async (req, res) => {
  const courses = await Course.find() //find якщо пустий то отримуємо всі/.lean() для помилок
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

  const course = await Course.findById(req.params.id)

  res.render('courseEdit', { title: `Редагувати ${course.title}`, course })
})

//тут редагування
router.post('/edit', async (req, res) => {
  const { id } = req.body //забираємо нижнє _ щоб було не _id а id
  delete req.body.id
  await Course.findByIdAndUpdate(id, req.body)
  res.redirect('/courses')
})

//видалити курс
router.post('/remove', async (req, res) => {
  try {
    await Course.deleteOne({ _id: req.body.id })
    res.redirect('/courses')
  } catch (e) {
    console.log(e)
  }
})

//для оброблення route коли перейшли на --відкрити курс--
router.get('/:id', async (req, res) => {
  const course = await Course.findById(req.params.id)

  res.render('course', { layout: 'empty', title: `Курс ${course.title}`, course })
})

module.exports = router
