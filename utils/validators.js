const { body } = require('express-validator/check')
const User = require('../models/user')

exports.registerValidator = [
  //валідатори на перевірку коректності вводу даних при реєстрації
  body('email', 'Будь ласка, введіть коректний email')
    .isEmail()
    .custom(async (value, { req }) => {
      try {
        const user = await User.findOne({ email: value }) //перевірка чи email не зареєстрований вже
        if (user) {
          return Promise.reject('Такий email вже зайнятий')
        }
      } catch (e) {
        console.log(e)
      }
    })
    .normalizeEmail(), //нормалізує криво введений email типу vAsYl11 збереже як vasul11

  body('password', 'Пароль має бути більше ніж 6 символів')
    .isLength({ min: 6, max: 20 })
    .isAlphanumeric()
    .trim(), //видаляє зайві пробіли

  body('confirm')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Паролі не співпадають')
      }
      return true
    })
    .trim(),

  body('name').isLength({ min: 3 }).withMessage('Ім`я повинне бути більше ніж 2 літер').trim(),
]
