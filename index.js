const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const exhbs = require('express-handlebars')

const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const cardRoutes = require('./routes/card')
const coursesRoutes = require('./routes/courses')
const ordersRoutes = require('./routes/orders')
const authRoutes = require('./routes/auth')
const User = require('./models/user')

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

app.use(async (req, res, next) => {
  try {
    const user = await User.findById('62bc2d54befb8d1927cb5214')
    req.user = user
    next()
  } catch (e) {
    console.log(e)
  }
})

app.use(express.static(path.join(__dirname, 'public'))) //щоб зробити папку статичною і її експрес бачив
app.use(express.urlencoded({ extended: true }))

app.use('/', homeRoutes) //щоб використовувати усі наші роути
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/card', cardRoutes)
app.use('/orders', ordersRoutes)
app.use('/auth', authRoutes)

const PORT = process.env.PORT || 3000

async function start() {
  try {
    const url = `mongodb+srv://vasyl:Vasyl2002@cluster0.llaredl.mongodb.net/shop`
    await mongoose.connect(url)

    const candidate = await User.findOne()
    //якщо в нас нема користувачів то створюємо
    if (!candidate) {
      const user = new User({
        email: 'vasylhryts@knu.ua',
        name: 'vasyl',
        cart: { items: [] },
      })
      await user.save()
    }
    app.listen(PORT, () => {
      console.log(`Server has been listening on port ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()
