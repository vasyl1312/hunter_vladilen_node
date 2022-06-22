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

app.get('/', (req, res) => {
  //тепер можна просто рендерити сторінки
  res.render('index')
})

app.get('/about', (req, res) => {
  res.render('about')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server has been listening on port ${PORT}`)
})
