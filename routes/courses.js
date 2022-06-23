const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
  res.render('courses', {
    title: 'Курси',
    //для підсвітки коли на цій сторінці
    isCourses: true,
  })
})

module.exports = router
