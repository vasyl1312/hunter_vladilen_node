const express = require('express')
const path = require('path')
const csrf = require('csurf')
const flash = require('connect-flash')
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
const varMiddleware = require('./middleware/variables')
const userMiddleware = require('./middleware/user')
const errorMiddleware = require('./middleware/error')
const keys = require('./keys')
const PORT = process.env.PORT || 3000

const app = express()
const hbs = exhbs.create({
  extname: 'hbs',
  defaultLayout: 'main',
  helpers: require('./utils/hbs-helpers'),
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
})

const store = new MongoStore({
  collection: 'sessions',
  uri: keys.MONGODB_URI,
})

app.engine('hbs', hbs.engine) //щоб зареєструвати як движок для html-сторінок
app.set('view engine', 'hbs') //а тут ми цей движок використовуєм
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public'))) //щоб зробити папку статичною і її експрес бачив
app.use(express.urlencoded({ extended: true }))
app.use(session({ secret: keys.SESSION_SECRET, resave: false, saveUninitialized: false, store }))
app.use(csrf())
app.use(flash())
app.use(varMiddleware)
app.use(userMiddleware)

app.use('/', homeRoutes) //щоб використовувати усі наші роути
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/card', cardRoutes)
app.use('/orders', ordersRoutes)
app.use('/auth', authRoutes)

app.use(errorMiddleware) //вкінці бо деякі роути будуть не доступні

async function start() {
  try {
    await mongoose.connect(keys.MONGODB_URI)
    app.listen(PORT, () => {
      console.log(`Server has been listening on port ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()
