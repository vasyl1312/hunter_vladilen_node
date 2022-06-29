const { Schema, model } = require('mongoose')

const course = new Schema({
  title: {
    type: String,
    required: true, //позначаємо що це поле є обов'язковим
  },
  price: {
    type: Number,
    required: true,
  },
  img: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', //взаємодія між курсами та користувачем
  },
})

module.exports = model('Course', course)
