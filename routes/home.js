const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
  //тепер можна просто рендерити сторінки
  res.render('index', {
    title: 'Головна сторінка',
    isHome: true, //для підсвітки коли на цій сторінці
  })
})

module.exports = router
