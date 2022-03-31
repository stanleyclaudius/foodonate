const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  alamatEmail: {
    type: String,
    trim: true
  },
  avatar: {
    type: String,
    default: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png'
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  kataSandi: {
    type: String,
    required: true,
    minlength: 8
  },
  role: {
    type: String,
    default: 'pengguna'
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('user', userSchema)