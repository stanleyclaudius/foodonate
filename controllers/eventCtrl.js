const Event = require('./../models/Event')
const Donator = require('./../models/Donator')
const History = require('./../models/History')

const Pagination = req => {
  const page = req.query.page || 1
  const limit=  req.query.limit || 3
  const skip = (page - 1) * limit
  return { page, limit, skip }
}

const eventCtrl = {
  createEvent: async(req, res) => {
    try {
      const { nama, lokasi, tanggal, batasRegistrasi, kategori, waktuMulai, waktuSelesai, kapasitas, deskripsi, gambar } = req.body
      if (!nama || !lokasi || !tanggal || !kategori || !waktuMulai || !batasRegistrasi || !waktuSelesai || !deskripsi || !kapasitas || !gambar)
        return res.status(400).json({ msg: 'Data untuk membuat event tidak diisi dengan lengkap.' })

      const findDonator = await Donator.findOne({ user: req.user._id, status: 'terverifikasi' })
      if (!findDonator)
        return res.status(400).json({ msg: 'Profile donatur belum terverifikasi.' })

      const newEvent = new Event({
        user: req.user._id,
        nama,
        lokasi,
        kategori,
        tanggal,
        waktuMulai,
        waktuSelesai,
        batasRegistrasi,
        deskripsi,
        kapasitas,
        gambar
      })
      await newEvent.save()

      return res.status(200).json({
        msg: 'Event berhasil disimpan.',
        event: newEvent
      })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getEvent: async(req, res) => {
    try {
      const events = await Event.aggregate([
        {
          $lookup: {
            from: 'donators',
            localField: 'user',
            foreignField: 'user',
            as: 'donator'
          }
        },
        {
          $lookup: {
            from: 'histories',
            let: { history_id: '$pendaftar' },
            pipeline: [
              { $match: { $expr: { $in: ['$_id', '$$history_id'] } } },
              {
                $lookup: {
                  from: 'users',
                  localField: 'user',
                  foreignField: '_id',
                  as: 'user'
                }
              },
              { $unwind: '$user' }
            ],
            as: 'pendaftar'
          }
        },
        {
          $unwind: '$donator'
        },
        { $sort: { createdAt: -1 } }
      ])
      return res.status(200).json({ events })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  registerEvent: async(req, res) => {
    try {
      const checkRegisterEligibility = await History.findOne({ user: req.user._id, event: req.params.id })
      if (checkRegisterEligibility)
        return res.status(400).json({ msg: 'Anda sudah melakukan registrasi ke event ini.' })

      const nowDate = new Date()
      const checkMaxRegisterDate = await Event.findOne({ _id: req.params.id })
      if (nowDate > checkMaxRegisterDate.batasRegistrasi)
        return res.status(400).json({ msg: 'Pendaftaran untuk event ini sudah ditutup.' })

      const newHistory = new History({
        user: req.user._id,
        event: req.params.id
      })
      await newHistory.save()

      const event = await Event.findOneAndUpdate({ _id: req.params.id }, {
        $push: { pendaftar: newHistory._id }
      }, { new: true })
      if (!event)
        return res.status(404).json({ msg: 'Event tidak ditemukan.' })

      return res.status(200).json({ msg: 'Registrasi event berhasil dilakukan.' })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getEventByUser: async(req, res) => {
    try {
      const events = await History.find({ user: req.user._id }).sort('-createdAt').populate('event')
      return res.status(200).json({ events })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getHomeEvents: async(req, res) => {
    try {
      const events = await Event.aggregate([
        { $match: { batasRegistrasi: { $gt: new Date() } } },
        {
          $lookup: {
            from: 'donators',
            localField: 'user',
            foreignField: 'user',
            as: 'donator'
          }
        },
        {
          $unwind: '$donator'
        },
        { $sort: { createdAt: -1 } },
        { $limit: 4 }
      ])

      return res.status(200).json({ events })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getFilteredEvents: async(req, res) => {
    const { skip, limit } = Pagination(req)

    const kategoriQuery = []
    if (req.query.kategori) {
      if (typeof req.query.kategori === 'string') {
        kategoriQuery.push(req.query.kategori)
      } else {
        for (let i = 0; i < req.query.kategori.length; i++) {
          kategoriQuery.push(req.query.kategori[i])
        }
      }
    }

    const lokasiQuery = []
    if (req.query.lokasi) {
      if (typeof req.query.lokasi === 'string') {
        lokasiQuery.push(req.query.lokasi)
      } else {
        for (let i = 0; i < req.query.lokasi.length; i++) {
          lokasiQuery.push(req.query.lokasi[i])
        }
      }
    }

    const dataAggregation = [
      {
        $lookup: {
          from: 'donators',
          localField: 'user',
          foreignField: 'user',
          as: 'donator'
        }
      },
      { $unwind: '$donator' },
      { $skip: skip },
      { $limit: limit }
    ]

    const countAggregation = [
      { $count: 'count' }
    ]

    if (kategoriQuery.length !== 0) {
      dataAggregation.unshift({
        $match: {
          kategori: { $in: kategoriQuery }
        }
      })

      countAggregation.unshift({
        $match: {
          kategori: { $in: kategoriQuery }
        }
      })
    }

    if (lokasiQuery.length !== 0) {
      dataAggregation.unshift({
        $match: {
          lokasi: { $in: lokasiQuery }
        }
      })

      countAggregation.unshift({
        $match: {
          lokasi: { $in: lokasiQuery }
        }
      })
    }

    if (req.query.urutkan) {
      if (req.query.urutkan === 'terbaru') {
        dataAggregation.push({ $sort: { createdAt: -1 } })
        countAggregation.push({ $sort: { createdAt: -1 } })
      } else {
        const year = new Date().getFullYear()
        let month = new Date().getMonth() + 1
        let date = new Date().getDate()
        
        if (month.toString().length === 1) {
          month = `0${month}`
        }

        if (date.toString().length === 1) {
          date = `0${date}`
        }

        dataAggregation.push({
          $match: { tanggal: new Date(`${year}-${month}-${date}T00:00:00.000+00:00`) }
        })

        countAggregation.push({
          $match: { tanggal: new Date(`${year}-${month}-${date}T00:00:00.000+00:00`) }
        })
      }
    }

    try {
      const data = await Event.aggregate([
        {
          $facet: {
            totalData: dataAggregation,
            totalCount: countAggregation
          }
        },
        {
          $project: {
            count: { $arrayElemAt: ['$totalCount.count', 0] },
            totalData: 1
          }
        }
      ])

      const events = data[0].totalData
      const eventsCount = data[0].count
      let totalPage = 0

      if (eventsCount % limit === 0) {
        totalPage = eventsCount / limit
      } else {
        totalPage = Math.floor(eventsCount / limit) + 1
      }

      return res.status(200).json({ events, totalPage })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getEventByDonator: async(req, res) => {
    try {
      const events = await Event.aggregate([
        { $match: { user: req.user._id } },
        {
          $lookup: {
            from: 'histories',
            let: { history_id: '$pendaftar' },
            pipeline: [
              { $match: { $expr: { $in: ['$_id', '$$history_id'] } } },
              {
                $lookup: {
                  from: 'users',
                  localField: 'user',
                  foreignField: '_id',
                  as: 'user'
                }
              },
              { $unwind: '$user' }
            ],
            as: 'pendaftar'
          }
        },
        { $sort: { createdAt: -1 } }
      ])
      
      return res.status(200).json({ events })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  deleteEvent: async(req, res) => {
    try {
      const findEvent = await Event.find({ id: req.params.id, user: req.user._id })
      if (!findEvent)
        return res.status(404).json({ msg: 'Event tidak ditemukan.' })
        
      const event = await Event.findByIdAndDelete(req.params.id)
      if (!event)
        return res.status(404).json({ msg: 'Event tidak ditemukan.' })

      return res.status(200).json({ msg: 'Data event telah dihapus.' })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  searchEvent: async(req, res) => {
    try {
      const events = await Event.aggregate([
        {
          $match: { nama: { $regex: req.query.event } }
        },
        {
          $lookup: {
            from: 'donators',
            localField: 'user',
            foreignField: 'user',
            as: 'donator'
          }
        },
        { $unwind: '$donator' }
      ])

      return res.status(200).json({ events })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  updateEvent: async(req, res) => {
    try {
      const { nama, lokasi, tanggal, batasRegistrasi, kategori, waktuMulai, waktuSelesai, kapasitas, deskripsi, gambar } = req.body
      if (!nama || !lokasi || !tanggal || !batasRegistrasi || !kategori || !waktuMulai || !waktuSelesai || !deskripsi || !kapasitas || !gambar)
        return res.status(400).json({ msg: 'Data untuk mengubah event tidak diisi dengan lengkap.' })

      const findDonator = await Donator.findOne({ user: req.user._id, status: 'terverifikasi' })
      if (!findDonator)
        return res.status(400).json({ msg: 'Profile donatur belum terverifikasi.' })

      const event = await Event.findOneAndUpdate({ _id: req.params.id }, {
        nama, lokasi, tanggal, batasRegistrasi, kategori, waktuMulai, waktuSelesai, kapasitas, deskripsi, gambar
      }, { new: true })
      if (!event)
        return res.status(404).json({ msg: 'Event tidak ditemukan.' })

      return res.status(200).json({
        msg: 'Data event barhasil diubah.',
        event
      })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  }
}

module.exports = eventCtrl