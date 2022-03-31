const Donator = require('./../models/Donator')
const User = require('./../models/User')
const Event = require('./../models/Event')

const donatorCtrl = {
  completeProfile: async(req, res) => {
    try {
      const { nama, pemilik, nik, alamatEmail, alamat } = req.body
      if (!nama || !pemilik || !nik || !alamatEmail || !alamat)
        return res.status(400).json({ msg: 'Kolom nama, pemilik, NIK, dan alamat wajib diisi.' })

      const findUser = await User.findOne({ alamatEmail })
      if (findUser)
        return res.status(400).json({ msg: 'Alamat email sudah terdaftar sebelumnya.' })

      await User.findOneAndUpdate({ _id: req.user._id }, { alamatEmail }, { new: true })

      const newDonator = new Donator({
        nama, pemilik, nik, alamat, user: req.user._id
      })
      await newDonator.save()

      return res.status(200).json({ msg: 'Profile donatur berhasil dikirim.' })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getUnverifiedDonator: async(req, res) => {
    try {
      const donators = await Donator.find({ status: 'tidak terverifikasi' }).sort('-createdAt').populate('user')
      return res.status(200).json({ donators })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getVerifiedDonator: async(req, res) => {
    try {
      const donators = await Donator.find({ status: 'terverifikasi' }).sort('-createdAt').populate('user')
      return res.status(200).json({ donators })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  verifiedDonator: async(req, res) => {
    try {
      const updatedDonator = await Donator.findOneAndUpdate({ _id: req.params.id }, { status: 'terverifikasi' }, { new: true })
      if (!updatedDonator)
        return res.status(404).json({ msg: 'Donatur tidak ditemukan.' })

      return res.status(200).json({ msg: 'Donatur terverifikasi.' })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  rejectDonator: async(req, res) => {
    try {
      const donator = await Donator.findOneAndDelete({ _id: req.params.id })
      console.log(donator)
      return res.status(200).json({ msg: 'Permohonan konfirmasi donatur telah ditolak.' })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getDonatorByUser: async(req, res) => {
    try {
      const donator = await Donator.findOne({ user: req.user._id })
      if (!donator)
        return res.status(404).json({ msg: 'Donatur tidak ditemukan.' })
        
      return res.status(200).json({ donator })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  deleteDonator: async(req, res) => {
    try {
      const donator = await Donator.findByIdAndDelete(req.params.id)
      await User.findByIdAndDelete(donator.user)
      await Event.deleteMany({ user: donator.user })

      return res.status(200).json({ msg: 'Data donatur telah terhapus.' })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  }
}

module.exports = donatorCtrl