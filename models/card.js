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

  static async remove(id) {
    const card = await Card.fetch()

    const idx = card.courses.findIndex((c) => c.id === id)
    const course = card.courses[idx]

    if (course.count === 1) {
      //видаляємо якщо в кошику тільки 1 к-ть виду курсу
      card.courses = card.courses.filter((c) => c.id !== id)
    } else {
      //якщо там mern 2-то зменшуємо кількість
      card.courses[idx].count--
    }

    card.price -= course.price //перераховуємо ціну

    return new Promise((resolve, reject) => {
      //тепер все назад вертаємо в json
      fs.writeFile(p, JSON.stringify(card), (err) => {
        if (err) reject(err)
        else resolve(card)
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
