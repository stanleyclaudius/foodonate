const mongoose = require('mongoose')

const newsSchema = new mongoose.Schema({
  judul: {
    type: String,
    required: true,
    trim: true
  },
  isi: {
    type: String,
    required: true,
    trim: true
  },
  gambar: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('news', newsSchema)