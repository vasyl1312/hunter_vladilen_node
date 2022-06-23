const { v4: uuidv4 } = require('uuid')
const path = require('path')
const fs = require('fs')

class Course {
  constructor(title, price, img) {
    this.title = title
    this.price = price
    this.img = img
    this.id = uuidv4() //щоб були унікальні id
  }

  toJson() {
    return { title: this.title, price: this.price, img: this.img, id: this.id }
  }

  //береобразуємо у формат json і зберіг у окремий файл,async щоб почекати данi з бази
  async save() {
    const courses = await Course.getAll()
    courses.push(this.toJson())

    return new Promise((resolve, reject) => {
      //зберігаємо усе в базу яку створили
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'courses.json'),
        JSON.stringify(courses),
        (err) => {
          if (err) reject(err)
          else resolve()
        }
      )
    })
  }

  //дістаємо все з файлу імпровізованої бази
  static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(path.join(__dirname, '..', 'data', 'courses.json'), 'utf-8', (err, content) => {
        if (err) reject(err)
        else resolve(JSON.parse(content))
      })
    })
  }
}

module.exports = Course
