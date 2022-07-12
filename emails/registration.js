const keys = require('../keyss')

module.exports = function (email) {
  return {
    to: email,
    from: keys.EMAIL_FROM,
    subject: 'Акаунт створено',
    html: `
      <h1>Ласкаво просимо у наш магазин</h1>
      <p>Ви успішно створили акаунт з email - ${email}</p>
      <hr />
      <a href="${keys.BASE_URL}">Магазин курсів</a>
    `,
  }
}
