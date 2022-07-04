//якщо користувач зареєстрований то доступні роути
module.exports = function (req, res, next) {
  if (!req.session.isAuthenticated) {
    return res.redirect('/auth/login')
  }

  next()
}
