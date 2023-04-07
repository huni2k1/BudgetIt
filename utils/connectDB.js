const config = require('./config')
const mongoose = require('mongoose')
const connectDB =
  () => {
    mongoose.connect(config.MONGODB_URI).then(result => {
      console.log('connected to MongoDB')
    })
    .catch((error) => {
      console.log('error connecting to MongoDB:', error.message)
    })
  }
exports.connectDB=connectDB