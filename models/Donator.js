const mongoose = require('mongoose')

const donatorSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
    trim: true
  },
  pemilik: {
    type: String,
    required: true,
    trim: true
  },
  nik: {
    type: String,
    required: true,
    trim: true
  },
  alamat: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    default: 'tidak terverifikasi'
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user'
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('donator', donatorSchema)