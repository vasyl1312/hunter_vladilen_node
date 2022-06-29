const { Router } = require('express')
const Course = require('../models/course')
const router = new Router()

router.post('/add', async (req, res) => {
  const course = await Course.findById(req.body.id) //отримуємо id об'єкта якого хочемо купити
  await req.user.addToCart(course) //тепер ми прив'язані до кожного user окремо
  res.redirect('/card')
})

router.delete('/remove/:id', async (req, res) => {
  const card = await Card.remove(req.params.id)
  res.status(200).json(card)
})

router.get('/', async (req, res) => {
  // const card = await Card.fetch() //тут отримуємо усю корзину
  // res.render('card', {
  //   title: 'Кошик',
  //   isCard: true,
  //   courses: card.courses,
  //   price: card.price,
  // })
  res.json({ test: true })
})

module.exports = router
