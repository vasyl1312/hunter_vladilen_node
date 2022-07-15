const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  email: { type: String, required: true },
  name: String,
  password: { type: String, required: true },
  avatarUrl: String,
  resetToken: String,
  resetTokenExp: Date,
  cart: {
    //щоб для кожного користувача зберігалась його корзина
    items: [
      {
        count: { type: Number, required: true, default: 1 },
        courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
      },
    ],
  },
})

//розширюємо схему одразу тут щоб додти товар в кошик, func а не стрілкова бо треба this
userSchema.methods.addToCart = function (course) {
  const items = [...this.cart.items] //щоб в нас назви не повтор ми розвертаємо масив і записуєм копію
  //треба знайти id масиву з яким працюємо
  const idx = items.findIndex((c) => {
    return c.courseId.toString() === course._id.toString() //переводимо об'єкти в string
  })
  //якщо курс є то ++ к-ть
  if (idx >= 0) {
    items[idx].count++
  } else {
    //додаємо елем в кошик якщо його там нема
    items.push({
      courseId: course._id,
      count: 1,
    })
  }

  this.cart = { items }
  return this.save()
}

userSchema.methods.removeFromCard = function (id) {
  let items = [...this.cart.items]
  const idx = items.findIndex((c) => c.courseId.toString() === id.toString())
  //якщо курсів > 1 то -- к-ть, інакше видалити
  if (items[idx].count === 1) {
    items = items.filter((c) => c.courseId.toString() !== id.toString()) //тут просто по filter видал курс по id
  } else {
    items[idx].count--
  }

  this.cart = { items }
  return this.save()
}

//метод для чищення кошику піля замовлення
userSchema.methods.clearCart = function () {
  this.cart = { items: [] }
  return this.save()
}

module.exports = model('User', userSchema)
