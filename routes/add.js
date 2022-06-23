const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
  res.render('add', {
    title: 'Додати',
    //для підсвітки коли на цій сторінці
    isAdd: true,
  })
})

//щоб проробити результат після надсилання нового курсу
router.post('/', (req, res) => {
  console.log(req.body)

  //коли додали новий курс - редірект на всі курси
  res.redirect('/courses')
})

module.exports = router
