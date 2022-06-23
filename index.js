const express = require('express')
const path = require('path')
const exhbs = require('express-handlebars')

const app = express()

const hbs = exhbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
})

//щоб зареєструвати як движок для html-сторінок
app.engine('hbs', hbs.engine)
//а тут ми цей движок використовуєм
app.set('view engine', 'hbs')
app.set('views', 'views')

//щоб зробити папку статичною і її експрес бачив
app.use(express.static('public'))

app.get('/', (req, res) => {
  //тепер можна просто рендерити сторінки
  res.render('index', {
    title: 'Головна сторінка',
    //підсвітка коли на цій сторінці
    isHome: true,
  })
})

//routes для сторінок
app.get('/add', (req, res) => {
  res.render('add', {
    title: 'Додати',
    isAdd: true,
  })
})

app.get('/courses', (req, res) => {
  res.render('courses', {
    title: 'Курси',
    isCourses: true,
  })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server has been listening on port ${PORT}`)
})
