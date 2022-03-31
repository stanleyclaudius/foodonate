const mongoose = require('mongoose')

const historySchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user'
  },
  event: {
    type: mongoose.Types.ObjectId,
    ref: 'event'
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('history', historySchema)