const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
  res.render('add', {
    title: 'Додати',
    //для підсвітки коли на цій сторінці
    isAdd: true,
  })
})

module.exports = router
