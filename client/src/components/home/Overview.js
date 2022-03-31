import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDataAPI } from './../../utils/fetchData'
import { getEvent } from './../../redux/actions/eventActions'

const Overview = () => {
  const [jlhDonatur, setJlhDonatur] = useState(0)
  const [jlhPendaftar, setJlhPendaftar] = useState(0)
  const [jlhEvent, setJlhEvent] = useState(0)
  const [jlhLokasi, setJlhLokasi] = useState(0)

  const dispatch = useDispatch()
  const { event } = useSelector(state => state)

  const getLokasi = useCallback(() => {
    const lokasiTemp = []

    event.data.forEach(item => {
      if (!lokasiTemp.includes(item.kategori)) {
        lokasiTemp.push(item.kategori)
      }
    })
    
    setJlhLokasi(lokasiTemp.length)
  }, [event.data])

  useEffect(() => {
    getDataAPI('dashboard/home')
      .then(res => {
        setJlhDonatur(res.data.donaturAktif)
        setJlhPendaftar(res.data.pendaftarDonasi)
        setJlhEvent(res.data.jumlahEvent)
      })
  }, [])

  useEffect(() => {
    dispatch(getEvent())
  }, [dispatch])

  useEffect(() => {
    getLokasi()
  }, [getLokasi])
  
  return (
    <div className='mx-14 my-10'>
      <h1 data-aos='fade-down' className='text-orange-400 text-center text-2xl font-medium'>Foodonate Overview</h1>
      <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-20 mt-10'>
        <div data-aos='fade-up' data-aos-delay='200' className='shadow-xl rounded-md bg-[#FE7A2F] text-white text-center font-medium pt-20 pb-16'>
          <p className='mb-4 text-4xl'>{jlhDonatur}</p>
          <p className='text-lg'>Jumlah donatur aktif</p>
        </div>
        <div data-aos='fade-up' data-aos-delay='300' className='shadow-xl rounded-md bg-[#FF8E42] text-white text-center font-medium pt-20 pb-16'>
          <p className='mb-4 text-4xl'>{jlhPendaftar}</p>
          <p className='text-lg'>Jumlah pendaftar donasi</p>
        </div>
        <div data-aos='fade-up' data-aos-delay='400' className='shadow-xl rounded-md bg-[#FFA500] text-white text-center font-medium pt-20 pb-16'>
          <p className='mb-4 text-4xl'>{jlhEvent}</p>
          <p className='text-lg'>Jumlah event donasi</p>
        </div>
        <div data-aos='fade-up' data-aos-delay='500' className='shadow-xl rounded-md bg-[#F0AB53] text-white text-center font-medium pt-20 pb-16'>
          <p className='mb-4 text-4xl'>{jlhLokasi}</p>
          <p className='text-lg'>Jumlah lokasi</p>
        </div>
      </div>
    </div>
  )
}

export default Overview