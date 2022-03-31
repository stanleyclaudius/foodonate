const mongoose = require('mongoose')

const connectDB = async() => {
  await mongoose.connect(process.env.MONGODB_URL, {
    autoIndex: true
  }, (err) => {
    if (err) throw err
    console.log('MongoDB connection established.')
  })
}

module.exports = connectDB