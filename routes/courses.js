const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
  res.render('courses', {
    title: 'Курси',
    isCourses: true, //для підсвітки коли на цій сторінці
  })
})

module.exports = router
