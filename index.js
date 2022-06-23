const express = require('express')
const path = require('path')
const exhbs = require('express-handlebars')
const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const coursesRoutes = require('./routes/courses')

const app = express()

const hbs = exhbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
})

app.engine('hbs', hbs.engine) //щоб зареєструвати як движок для html-сторінок
app.set('view engine', 'hbs') //а тут ми цей движок використовуєм
app.set('views', 'views')

app.use(express.static('public')) //щоб зробити папку статичною і її експрес бачив
app.use(express.urlencoded({ extended: true }))

app.use('/', homeRoutes) //щоб використовувати усі наші роути
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server has been listening on port ${PORT}`)
})
