const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  cart: {
    //щоб для кожного користувача зберігаласб його корзина
    items: [
      {
        count: { type: Number, required: true, default: 1 },
        CourseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
      },
    ],
  },
})

module.exports = model('User', userSchema)
