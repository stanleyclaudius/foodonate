const User = require('./../models/User')

const userCtrl = {
  getUser: async(req, res) => {
    try {
      const users = await User.find({ role: 'pengguna' }).sort('-createdAt')
      return res.status(200).json({ users })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  deleteUser: async(req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id)
      if (!user)
        return res.status(404).json({ msg: 'User tidak ditemukan.' })

      return res.status(200).json({ msg: 'Data user telah terhapus.' })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  }
}

module.exports = userCtrl