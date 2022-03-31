const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('./../models/User')
const { generateAccessToken, generateRefreshToken } = require('./../utils/generateToken')

const authCtrl = {
  register: async(req, res) => {
    try {
      const { nama, username, kataSandi, role } = req.body
      if (!nama || !username || !kataSandi || !role)
        return res.status(400).json({ msg: 'Kolom nama, username, dan juga kata sandi wajib diisi.' })

      const findUsername = await User.findOne({ username })
      if (findUsername)
        return res.status(400).json({ msg: 'Username telah terdaftar dalam aplikasi.' })

      if (kataSandi.length < 8)
        return res.status(400).json({ msg: 'Kata sandi harus mempunyai minimal 8 karakter.' })

      const kataSandiHash = await bcrypt.hash(kataSandi, 12)
      
      const newUser = new User({
        nama,
        username,
        kataSandi: kataSandiHash,
        role
      })
      await newUser.save()

      const accessToken = generateAccessToken({ id: newUser._id })
      const refreshToken = generateRefreshToken({ id: newUser._id })

      res.cookie('foodonate_rfToken', refreshToken, {
        httpOnly: true,
        path: '/api/v1/auth/refresh_token',
        maxAge: 30 * 24 * 60 * 60 * 1000
      })

      return res.status(200).json({
        msg: 'Registrasi berhasil.',
        accessToken,
        user: {
          ...newUser._doc,
          kataSandi: ''
        }
      })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  login: async(req, res) => {
    try {
      const { username, kataSandi } = req.body
      if (!username || !kataSandi)
        return res.status(400).json({ msg: 'Kolom username, dan juga kata sandi wajib diisi.' })

      const user = await User.findOne({ username })
      if (!user)
        return res.status(400).json({ msg: 'User tidak ditemukan.' })

      const checkPassword = await bcrypt.compare(kataSandi, user.kataSandi)
      if (!checkPassword)
        return res.status(400).json({ msg: 'User tidak ditemukan.' })

      const accessToken = generateAccessToken({ id: user._id })
      const refreshToken = generateRefreshToken({ id: user._id })

      res.cookie('foodonate_rfToken', refreshToken, {
        httpOnly: true,
        path: '/api/v1/auth/refresh_token',
        maxAge: 30 * 24 * 60 * 60 * 1000
      })

      return res.status(200).json({
        accessToken,
        user: {
          ...user._doc,
          kataSandi: ''
        }
      })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  logout: async(req, res) => {
    try {
      res.clearCookie('foodonate_rfToken', {
        path: '/api/v1/auth/refresh_token'
      })

      return res.status(200).json({ msg: 'Logout berhasil.' })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  refreshToken: async(req, res) => {
    try {
      const token = req.cookies.foodonate_rfToken
      if (!token)
        return res.status(400).json({ msg: 'Autentikasi gagal.' })

      const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
      if (!decoded.id)
        return res.status(400).json({ msg: 'Token tidak valid.' })

      const user = await User.findOne({ _id: decoded.id }).select('-kataSandi')
      if (!user)
        return res.status(404).json({ msg: 'User tidak ditemukan.' })

      const accessToken = generateAccessToken({ id: user._id })

      return res.status(200).json({
        accessToken,
        user
      })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  editProfile: async(req, res) => {
    try {
      const { nama, avatar } = req.body
      if (!nama)
        return res.status(400).json({ msg: 'Field nama harus diisi.' })

      const user = await User.findOneAndUpdate({ _id: req.user._id }, {
        nama, avatar
      }, { new: true })
      if (!user)
        return res.status(404).json({ msg: 'User tidak ditemukan.' })

      return res.status(200).json({
        msg: 'Profile berhasil ter-update.',
        user
      })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  }
}

module.exports = authCtrl