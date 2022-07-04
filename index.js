const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const exhbs = require('express-handlebars')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)

const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const cardRoutes = require('./routes/card')
const coursesRoutes = require('./routes/courses')
const ordersRoutes = require('./routes/orders')
const authRoutes = require('./routes/auth')
const User = require('./models/user')
const varMiddlware = require('./middleware/variables')
const userMiddlware = require('./middleware/user')
const MONGODB_URI = `mongodb+srv://vasyl:Vasyl2002@cluster0.llaredl.mongodb.net/shop`
const PORT = process.env.PORT || 3000

const app = express()
const hbs = exhbs.create({
  extname: 'hbs',
  defaultLayout: 'main',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
})

const store = new MongoStore({
  collection: 'sessions',
  uri: MONGODB_URI,
})

app.engine('hbs', hbs.engine) //щоб зареєструвати як движок для html-сторінок
app.set('view engine', 'hbs') //а тут ми цей движок використовуєм
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public'))) //щоб зробити папку статичною і її експрес бачив
app.use(express.urlencoded({ extended: true }))
app.use(session({ secret: 'some secret value', resave: false, saveUninitialized: false, store }))
app.use(varMiddlware)
app.use(userMiddlware)

app.use('/', homeRoutes) //щоб використовувати усі наші роути
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/card', cardRoutes)
app.use('/orders', ordersRoutes)
app.use('/auth', authRoutes)

async function start() {
  try {
    await mongoose.connect(MONGODB_URI)
    app.listen(PORT, () => {
      console.log(`Server has been listening on port ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()
