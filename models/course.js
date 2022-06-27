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
})

module.exports = model('Course', course)
