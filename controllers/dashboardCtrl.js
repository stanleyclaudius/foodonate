const Donator = require('./../models/Donator')
const History = require('./../models/History')
const Event = require('./../models/Event')

const dashboardCtrl = {
  getHomeDashboard: async(req, res) => {
    try {
      const donaturAktif = await Donator.find({ status: 'terverifikasi' }).countDocuments()
      const pendaftarDonasi = await History.find().countDocuments()
      const jumlahEvent = await Event.find().countDocuments()

      return res.status(200).json({
        donaturAktif,
        pendaftarDonasi,
        jumlahEvent
      })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getDonatorDashboard: async(req, res) => {
    try {
      const events = await Event.find({ user: req.user._id, $year: { createdAt: new Date().toISOString() } })
      const eventMonth = []
      const monthlyEvent = []

      events.forEach(item => {
        const monthName = new Intl.DateTimeFormat('en-US',  { month: 'long' }).format(item.createdAt)
        if (!eventMonth.includes(monthName)) {
          eventMonth.push(monthName)
          monthlyEvent.push({ month: monthName, count: 0 })
        }
      })

      events.forEach(item => {
        const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(item.createdAt)
        monthlyEvent.forEach(data => {
          if (data.month === monthName) {
            data.count++
          }
        })
      })
      
      return res.status(200).json({ monthlyEvent })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  }
}

module.exports = dashboardCtrl