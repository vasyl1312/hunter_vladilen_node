const { Router } = require('express')
const { validationResult } = require('express-validator/check')
const Course = require('../models/course')
const auth = require('../middleware/auth') //якщо користувач зареєстрований то доступні роути
const { courseValidators } = require('../utils/validators')
const router = Router()

//функція для розподілу, якщо користувач створив курс то редагує - інші перегляд і придбання
function isOwner(course, req) {
  return course.userId.toString() === req.user._id.toString()
}

router.get('/', async (req, res) => {
  try {
    const courses = await Course.find() //тут ми список курсів
      .populate('userId', 'email name') //populate отримуємо(а select певні)дані про user
      .select('price title img')

    res.render('courses', {
      title: 'Курси',
      isCourses: true, //для підсвітки коли на цій сторінці
      userId: req.user ? req.user._id.toString() : null, //передаємо id користувача який у сесії
      courses,
    })
  } catch (e) {
    console.error(e)
  }
})

//для редагування курсів переходимо на саму сторінку
router.get('/:id/edit', auth, async (req, res) => {
  //allow потім для розподілу між клієнтом і власником
  if (!req.query.allow) return res.redirect('/')

  try {
    const course = await Course.findById(req.params.id)
    //забороняємо переходити на сторінку зміни курсу якщо по id не я його створив
    if (!isOwner(course, req)) {
      return res.redirect('/courses')
    }

    res.render('courseEdit', { title: `Редагувати ${course.title}`, course })
  } catch (e) {
    console.log(e)
  }
})

//тут редагування
router.post('/edit', auth, courseValidators, async (req, res) => {
  const errors = validationResult(req)
  const { id } = req.body //забираємо нижнє _ щоб було не _id а id
  if (!errors.isEmpty()) {
    return res.status(422).redirect(`/courses/${id}/edit?allow=true`)
  }

  try {
    delete req.body.id
    const course = await Course.findById(id)
    if (!isOwner(course, req)) {
      return res.redirect('/courses')
    }
    Object.assign(course, req.body)
    await course.save()
    res.redirect('/courses')
  } catch (e) {
    console.log(e)
  }
})

//видалити курс
router.post('/remove', auth, async (req, res) => {
  try {
    await Course.deleteOne({
      _id: req.body.id,
      userId: req.user._id,
    })
    res.redirect('/courses')
  } catch (e) {
    console.log(e)
  }
})

//для оброблення route коли перейшли на --відкрити курс--
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
    res.render('course', { layout: 'empty', title: `Курс ${course.title}`, course })
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
