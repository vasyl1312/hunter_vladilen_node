const { Router } = require('express')
const Order = require('../models/order')
const router = new Router()

router.get('/', async (req, res) => {
  try {
    //отримуємо список усіх ордерів які відносяться до цього id
    const orders = await Order.find({ 'user.userId': req.user._id }).populate('user.userId')

    res.render('orders', {
      isOrder: true,
      title: 'Замовлення',
      //формуємо ордери
      orders: orders.map((o) => {
        return {
          ...o._doc,
          price: o.courses.reduce((total, c) => {
            return (total += c.count * c.course.price)
          }, 0),
        }
      }),
    })
  } catch (e) {
    console.log(e)
  }
})

router.post('/', async (req, res) => {
  try {
    const user = await req.user.populate('cart.items.courseId') //отримуємо все з кошика
    const courses = user.cart.items.map((i) => ({
      count: i.count,
      course: { ...i.courseId._doc },
    }))

    //створення замовлення
    const order = new Order({
      user: {
        name: req.user.name,
        userId: req.user,
      },
      courses,
    })

    await order.save() //після створення замовлення чистимо кошик
    await req.user.clearCart()

    res.redirect('/orders')
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
