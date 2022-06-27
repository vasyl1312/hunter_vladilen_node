const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const exhbs = require('express-handlebars')
const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const cardRoutes = require('./routes/card')
const coursesRoutes = require('./routes/courses')

const app = express()

const hbs = exhbs.create({
  extname: 'hbs',
  defaultLayout: 'main',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
})

app.engine('hbs', hbs.engine) //щоб зареєструвати як движок для html-сторінок
app.set('view engine', 'hbs') //а тут ми цей движок використовуєм
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public'))) //щоб зробити папку статичною і її експрес бачив
app.use(express.urlencoded({ extended: true }))

app.use('/', homeRoutes) //щоб використовувати усі наші роути
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/card', cardRoutes)

const PORT = process.env.PORT || 3000

async function start() {
  try {
    const url = `mongodb+srv://vasyl:Vasyl2002@cluster0.llaredl.mongodb.net/shop`
    await mongoose.connect(url)
    app.listen(PORT, () => {
      console.log(`Server has been listening on port ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()
