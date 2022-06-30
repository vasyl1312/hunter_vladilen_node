const { Schema, model } = require('mongoose')

const courseSchema = new Schema({
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

//щоб справити помилку-id при видаленні курсу
courseSchema.method('toClient', function () {
  const course = this.toObject()
  course.id = course._id
  delete course._id
  return course
})

module.exports = model('Course', courseSchema)
