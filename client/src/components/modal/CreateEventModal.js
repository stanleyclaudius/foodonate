import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineClose } from 'react-icons/ai'
import { GLOBAL_TYPES } from './../../redux/types/globalTypes'
import { createEvent, updateEvent } from './../../redux/actions/eventActions'
import Loader from './../general/Loader'

const CreateEventModal = ({
  openCreateEventModal,
  setOpenCreateEventModal,
  createEventModalRef,
  selectedItem
}) => {
  const [eventData, setEventData] = useState({
    nama: '',
    lokasi: '',
    tanggal: '',
    batasRegistrasi: '',
    kategori: '',
    waktuMulai: '',
    waktuSelesai: '',
    deskripsi: '',
    kapasitas: ''
  })
  const [gambar, setGambar] = useState()
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const { auth } = useSelector(state => state)

  const handleChange = e => {
    const { name, value } = e.target
    setEventData({ ...eventData, [name]: value })
  }

  const handleChangeImage = e => {
    const file = e.target.files[0]
    setGambar(file)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!eventData.nama || !eventData.lokasi || !eventData.kategori || !eventData.tanggal || !eventData.batasRegistrasi || !eventData.waktuMulai || !eventData.waktuSelesai || !eventData.deskripsi || !eventData.kapasitas || !gambar) {
      return dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          errors: 'Data untuk menambah event tidak lengkap.'
        }
      })
    }

    if ((eventData.batasRegistrasi >= eventData.tanggal)) {
      return dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          errors: 'Tanggal batas registasi tidak valid.'
        }
      })
    }

    if (eventData.waktuMulai >= eventData.waktuSelesai) {
      return dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          errors: 'Waktu acara tidak valid.'
        }
      })
    }

    if (eventData.kapasitas < 1) {
      return dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          errors: 'Kapasitas donasi tidak bisa lebih kecil dari 0.'
        }
      })
    }

    setLoading(true)
    if (selectedItem) {
      await dispatch(updateEvent({ ...eventData, gambar }, selectedItem._id, auth.accessToken))
    } else {
      await dispatch(createEvent(eventData, gambar, auth))
    }
    setLoading(false)
    setOpenCreateEventModal(false)
    setEventData({
      nama: '',
      lokasi: '',
      kategori: '',
      tanggal: '',
      batasRegistrasi: '',
      waktuMulai: '',
      waktuSelesai: '',
      deskripsi: '',
      kapasitas: ''
    })
  }

  useEffect(() => {
    if (selectedItem) {
      setEventData({
        nama: selectedItem.nama,
        lokasi: selectedItem.lokasi,
        tanggal: selectedItem.tanggal,
        batasRegistrasi: selectedItem.batasRegistrasi,
        kategori: selectedItem.kategori,
        waktuMulai: selectedItem.waktuMulai,
        waktuSelesai: selectedItem.waktuSelesai,
        deskripsi: selectedItem.deskripsi,
        kapasitas: selectedItem.kapasitas
      })

      setGambar(selectedItem.gambar)
    }

    return () => {
      setEventData({
        nama: '',
        lokasi: '',
        tanggal: '',
        batasRegistrasi: '',
        kategori: '',
        waktuMulai: '',
        waktuSelesai: '',
        deskripsi: '',
        kapasitas: ''
      })

      setGambar()
    }
  }, [selectedItem])

  return (
    <div className={`fixed top-0 left-0 right-0 bottom-0 ${openCreateEventModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} transition-[opacity] flex items-center justify-center p-4 bg-[rgba(0,0,0,.7)]`}>
      <div ref={createEventModalRef} className={`bg-white w-full ${openCreateEventModal ? 'translate-y-0' : '-translate-y-12'} transition-[transform] max-w-[500px] rounded-md`}>
        <div className='border-b border-gray-300 px-5 py-4 flex items-center justify-between'>
          <h1 className='text-xl'>Tambah Event</h1>
          <AiOutlineClose onClick={() => setOpenCreateEventModal(false)} className='cursor-pointer' />
        </div>
        <div className='p-5 max-h-[500px] overflow-auto hide-scrollbar'>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor='nama' className='text-sm'>Nama Event</label>
              <input type='text' id='nama' name='nama' value={eventData.nama} onChange={handleChange} autoComplete='off' className='w-full border border-gray-300 rounded-md px-3 text-sm outline-0 h-10 mt-3' />
            </div>
            <div className='mt-4'>
              <label htmlFor='kategori' className='text-sm'>Kategori</label>
              <input type='text' id='kategori' name='kategori' value={eventData.kategori.toLowerCase()} onChange={handleChange} autoComplete='off' className='w-full border border-gray-300 rounded-md px-3 text-sm outline-0 h-10 mt-3' />
            </div>
            <div className='mt-4'>
              <label htmlFor='lokasi' className='text-sm'>Lokasi</label>
              <input type='text' id='lokasi' name='lokasi' value={eventData.lokasi.toLowerCase()} onChange={handleChange} autoComplete='off' className='w-full border border-gray-300 rounded-md px-3 text-sm outline-0 h-10 mt-3' />
            </div>
            <div className='mt-4'>
              <label htmlFor='tanggal' className='text-sm'>Tanggal</label>
              <input type='date' name='tanggal' id='tanggal' value={eventData.tanggal} onChange={handleChange} className='w-full border border-gray-300 text-sm px-3 rounded-md h-10 mt-3 outline-0' />
            </div>
            <div className='mt-4'>
              <label htmlFor='batasRegistrasi' className='text-sm'>Batas Registrasi</label>
              <input type='date' name='batasRegistrasi' id='batasRegistrasi' value={eventData.batasRegistrasi} onChange={handleChange} className='w-full border border-gray-300 text-sm px-3 rounded-md h-10 mt-3 outline-0' />
            </div>
            <div className='flex items-center gap-6 mt-4'>
              <div>
                <label htmlFor='waktuMulai' className='text-sm'>Waktu Mulai</label>
                <input type='time' name='waktuMulai' id='waktuMulai' value={eventData.waktuMulai} onChange={handleChange} className='text-sm w-full mt-3 border border-gray-300 outline-0 rounded-md h-10 px-3' />
              </div>
              <div>
                <label htmlFor='waktuSelesai' className='text-sm'>Waktu Selesai</label>
                <input type='time' id='waktuSelesai' name='waktuSelesai' value={eventData.waktuSelesai} onChange={handleChange} className='text-sm w-full mt-3 border border-gray-300 outline-0 rounded-md h-10 px-3' />
              </div>
            </div>
            <div className='mt-4'>
              <label htmlFor='deskripsi' className='text-sm'>Deskripsi</label>
              <textarea name='deskripsi' id='deskripsi' value={eventData.deskripsi} onChange={handleChange} className='w-full mt-3 resize-none p-3 outline-0 border border-gray-300 rounded-md text-xs h-28 leading-relaxed' />
            </div>
            <div className='mt-4'>
              <label htmlFor='kapasitas' className='text-sm'>Kapasitas</label>
              <input type='number' name='kapasitas' id='kapasitas' value={eventData.kapasitas} onChange={handleChange} className='w-full mt-3 resize-none p-3 outline-0 border border-gray-300 rounded-md text-sm' />
            </div>
            <div className='mt-4'>
              <label htmlFor='gambar' className='text-sm'>Gambar</label>
              <div className='flex gap-4'>
                {
                  gambar &&
                  <div className='w-24 h-24 rounded-md border border-gray-300 flex-1'>
                    <img
                      src={
                        gambar ?
                          typeof gambar === 'string'
                          ? gambar
                          : URL.createObjectURL(gambar)
                        : ''
                      }
                      alt={eventData.nama}
                      className='w-full h-full object-cover rounded-md'
                    />
                  </div>
                }
                <input type='file' accept='image/*' onChange={handleChangeImage} className='w-full border border-gray-300 text-sm rounded-md h-10 px-3 py-1 flex-[4]' />
              </div>
            </div>
            <button disabled={loading ? true : false} className={`text-sm text-white rounded-md px-3 py-2 ${!loading ? 'bg-orange-400 hover:bg-orange-500 cursor-pointer' : 'bg-orange-200 hover:bg-orange-200 cursor-auto'} transition-[background] mt-5`}>
              {
                loading
                ? <Loader />
                : 'Simpan'
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateEventModal