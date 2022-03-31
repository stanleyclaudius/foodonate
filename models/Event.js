const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user'
  },
  nama: {
    type: String,
    required: true,
    trim: true
  },
  kategori: {
    type: String,
    required: true
  },
  lokasi: {
    type: String,
    required: true,
    trim: true
  },
  tanggal: {
    type: Date,
    required: true
  },
  batasRegistrasi: {
    type: Date,
    required: true
  },
  waktuMulai: {
    type: String,
    required: true
  },
  waktuSelesai: {
    type: String,
    required: true
  },
  deskripsi: {
    type: String,
    required: true
  },
  kapasitas: {
    type: Number,
    required: true
  },
  gambar: {
    type: String,
    required: true
  },
  pendaftar: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'history'
    }
  ]
}, {
  timestamps: true
})

module.exports = mongoose.model('event', eventSchema)