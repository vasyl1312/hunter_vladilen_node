const { Router } = require('express')
const Course = require('../models/course')
const auth = require('../middleware/auth') //якщо користувач зареєстрований то доступні роути
const router = new Router()

//мапимо деякі дані
function mapCartItems(cart) {
  return cart.items.map((c) => ({
    ...c.courseId._doc,
    id: c.courseId.id, //додаєм id бо по замовч воно _id
    count: c.count,
  }))
}

//перераховуємо ціну
function computePrice(courses) {
  //reduce метод який перемножує кількість курсів на ціну і додає(від 0)
  return courses.reduce((total, course) => {
    return (total += course.price * course.count)
  }, 0)
}

router.post('/add', auth, async (req, res) => {
  const course = await Course.findById(req.body.id) //отримуємо id об'єкта якого хочемо купити
  await req.user.addToCart(course) //тепер ми прив'язані до кожного user окремо
  res.redirect('/card')
})

router.delete('/remove/:id', auth, async (req, res) => {
  await req.user.removeFromCard(req.params.id) // видад курс по id
  const user = await req.user.populate('cart.items.courseId')
  const courses = mapCartItems(user.cart) //дістаєм курси
  const cart = {
    courses, //повертаєм курси і ціни в кошик
    count: computePrice(courses),
  }

  res.status(200).json(cart)
})

router.get('/', auth, async (req, res) => {
  const user = await req.user.populate('cart.items.courseId')
  //.execPopulate()

  const courses = mapCartItems(user.cart)
  res.render('card', {
    title: 'Кошик',
    isCard: true,
    courses: courses,
    price: computePrice(courses),
  })
})

module.exports = router
