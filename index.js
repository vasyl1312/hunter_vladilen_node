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

//щоб зареєструвати як движок для html-сторінок
app.engine('hbs', hbs.engine)
//а тут ми цей движок використовуєм
app.set('view engine', 'hbs')
app.set('views', 'views')

//щоб зробити папку статичною і її експрес бачив
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
//щоб використовувати усі наші роути
app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server has been listening on port ${PORT}`)
})
