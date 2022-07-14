const { body } = require('express-validator/check')

exports.registerValidator = [
  body('email').isEmail().withMessage('Будь ласка, введіть коректний email'), //msg коли не email
  body('password', 'Пароль має бути більше ніж 6 символів')
    .isLength({ min: 6, max: 20 })
    .isAlphanumeric(), //пароль >6 і латинецею та цифр, msg передали як 2й параметр
  body('confirm').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Паролі не співпадають') //перевірка на збіг паролів
    }
    return true
  }),
  body('name').isLength({ min: 3 }).withMessage('Ім`я повинне бути більше ніж 2 літер'),
]
