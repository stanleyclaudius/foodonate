const News = require('./../models/News')

const newsCtrl = {
  createNews: async(req, res) => {
    try {
      const { judul, isi, gambar } = req.body
      if (!judul || !isi || !gambar)
        return res.status(400).json({ msg: 'Data untuk menambah berita tidak diisi dengan lengkap.' })

      const newNews = new News({ judul, isi, gambar })
      await newNews.save()

      return res.status(200).json({
        msg: 'Berita telah tersimpan.',
        news: newNews
      })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getNews: async(req, res) => {
    try {
      const news = await News.find().sort('-createdAt')
      return res.status(200).json({ news })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getHomeNews: async(req, res) => {
    try {
      const news = await News.find().sort('-createdAt').limit(2)
      return res.status(200).json({ news })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  deleteNews: async(req, res) => {
    try {
      const news = await News.findByIdAndDelete(req.params.id)
      if (!news)
        return res.status(200).json({ msg: 'Berita tidak ditemukan.' })

      return res.status(200).json({ msg: 'Berita telah terhapus.' })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  updateNews: async(req, res) => {
    try {
      const { judul, isi, gambar } = req.body
      if (!judul || !isi || !gambar)
        return res.status(400).json({ msg: 'Data untuk mengubah berita tidak diisi dengan lengkap.' })

      const news = await News.findOneAndUpdate({ _id: req.params.id }, {
        judul, isi, gambar
      }, { new: true })

      return res.status(200).json({
        msg: 'Berita berhasil diubah.',
        news
      })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  }
}

module.exports = newsCtrl