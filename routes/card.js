const { Router } = require('express')
const Card = require('../models/card')
const Course = require('../models/course')

const router = new Router()

router.post('/add', async (req, res) => {
  const course = await Course.getById(req.body.id) //отримуємо id об'єкта якого хочемо купити
  await Course.add(course)
  res.redirect('/card')
})

router.get('/', async (req, res) => {
  const card = await Card.fetch()
  res.render('card', { title: 'Кошик', card })
})

module.exports = router
