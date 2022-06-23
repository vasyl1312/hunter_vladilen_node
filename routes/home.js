const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
  //тепер можна просто рендерити сторінки
  res.render('index', {
    title: 'Головна сторінка',
    //для підсвітки коли на цій сторінці
    isHome: true,
  })
})

module.exports = router
