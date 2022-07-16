module.exports = {
  MONGODB_URI: process.env.MONGODB_URI,
  SESSION_SECRET: process.env.SESSION_SECRET,
  EMAIL_FROM: process.env.EMAIL_FROM, //треба в сендгріді веріфікувати емейл
  BASE_URL: process.env.BASE_URL,
  API_KEY: process.env.API_KEY,
}
