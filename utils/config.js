require('dotenv').config()
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const SALT_ROUND = process.env.SALT_ROUND

module.exports = {
  MONGODB_URI,
  PORT,
  SALT_ROUND
}