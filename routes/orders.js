const { Router } = require('express')
const Order = require('../models/order')
const router = new Router()

router.get('/', async (req, res) => {
  res.render('orders', {
    isOrder: true,
    title: 'Замовлення',
  })
})

router.post('/', async (req, res) => {
  res.redirect('/orders')
})

module.exports = router
