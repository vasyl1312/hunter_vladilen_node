const path = require('path')
const fs = require('fs')

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'card.json')

class Card {
  static async add(course) {
    const card = await Card.fetch() //дивимося усю кошику

    //якщо курс вже є і додаєм ще один то просто збідьшуємо кількість
    const idx = card.courses.findIndex((c) => c.id === course.id)
    const candidate = card.courses[idx]
    if (candidate) {
      //якщо курс вже є
      candidate.count++
      card.courses[idx] = candidate
    } else {
      //треба додати
      course.count = 1
      card.courses.push(course) //додаємо курс в кошик
    }

    card.price += +course.price //тепер загальну суму за покупку\\ +course.price-щоб читало як int

    return new Promise((resolve, reject) => {
      //тепер все назад вертаємо в json
      fs.writeFile(p, JSON.stringify(card), (err) => {
        if (err) reject(err)
        else resolve()
      })
    })
  }

  //отримує дані із корзини
  static async fetch() {
    return new Promise((resolve, reject) => {
      fs.readFile(p, 'utf-8', (err, content) => {
        if (err) reject(err)
        else resolve(JSON.parse(content))
      })
    })
  }
}

module.exports = Card
