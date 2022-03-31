const jwt = require('jsonwebtoken')
const User = require('./../models/User')

module.exports.isAuthenticated = async (req, res, next) => {
  try {
    const token = req.header('Authorization')
    if (!token)
      return res.status(400).json({ msg: 'Autentikasi gagal.' })

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    if (!decoded.id)
      return res.status(400).json({ msg: 'Autentikasi gagal.' })

    const user = await User.findOne({ _id: decoded.id })
    if (!user)
      return res.status(400).json({ msg: 'Autentikasi gagal.' })

    req.user = user
    next()
  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
}

module.exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ msg: `User dengan tipe akun ${req.user.role} tidak bisa mengakses halaman ini.` })
    }
    next()
  }
}