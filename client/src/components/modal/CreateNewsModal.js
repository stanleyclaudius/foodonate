import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineClose } from 'react-icons/ai'
import { GLOBAL_TYPES } from './../../redux/types/globalTypes'
import { createNews, updateNews } from './../../redux/actions/newsActions'
import Loader from './../general/Loader'

const CreateNewsModal = ({
  openCreateNewsModal,
  setOpenCreateNewsModal,
  createNewsModalRef,
  selectedItem
}) => {
  const [newsData, setNewsData] = useState({
    judul: '',
    isi: ''
  })
  const [gambar, setGambar] = useState()
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const { auth } = useSelector(state => state)
  
  const handleChange = e => {
    const { name, value } = e.target
    setNewsData({ ...newsData, [name]: value })
  }

  const handleChangeImage = e => {
    const file = e.target.files[0]
    setGambar(file)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!newsData.judul || !newsData.isi || !gambar) {
      return dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          errors: 'Data untuk tambah berita tidak disii dengan lengkap.'
        }
      })
    }

    setLoading(true)
    
    if (selectedItem) {
      await dispatch(updateNews({ ...newsData, gambar }, selectedItem._id, auth.accessToken))
    } else {
      await dispatch(createNews({ ...newsData, gambar }, auth.accessToken))
    }
    setLoading(false)
    setOpenCreateNewsModal(false)
    setNewsData({ judul: '', isi: '' })
    setGambar()
  }

  useEffect(() => {
    if (selectedItem) {
      setNewsData({
        judul: selectedItem.judul,
        isi: selectedItem.isi
      })

      setGambar(selectedItem.gambar)
    }

    return () => {
      setNewsData({
        judul: '',
        isi: ''
      })
      setGambar()
    }
  }, [selectedItem])

  return (
    <div className={`fixed top-0 left-0 right-0 bottom-0 ${openCreateNewsModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} transition-[opacity] flex items-center justify-center p-4 bg-[rgba(0,0,0,.7)]`}>
      <div ref={createNewsModalRef} className={`bg-white w-full ${openCreateNewsModal ? 'translate-y-0' : '-translate-y-12'} transition-[transform] max-w-[500px] rounded-md`}>
        <div className='border-b border-gray-300 px-5 py-4 flex items-center justify-between'>
          <h1>Tambah Berita</h1>
          <AiOutlineClose onClick={() => setOpenCreateNewsModal(false)} className='cursor-pointer' />
        </div>
        <div className='p-5'>
          <form onSubmit={handleSubmit}>
            <div>
              <label className='text-sm' htmlFor='judul'>Judul</label>
              <input type='text' name='judul' id='judul' autoComplete='off' value={newsData.judul} onChange={handleChange} className='w-full border border-gray-300 rounded-md h-10 px-2 outline-0 mt-3 text-sm' />
            </div>
            <div className='mt-5'>
              <label className='text-sm' htmlFor='gambar'>Gambar</label>
              <div className='flex mt-3 gap-3 rounded-md'>
                {
                  gambar &&
                  <div className='bg-gray-300 shrink-0 w-24 h-24 rounded-md'>
                    <img
                      src={
                        gambar ? 
                          typeof gambar === 'string'
                          ? gambar
                          : URL.createObjectURL(gambar)
                        : ''
                      }
                      alt={newsData.judul}
                      className='rounded-md w-full h-full object-cover'
                    />
                  </div>
                }
                <input type='file' accept='image/*' name='gambar' id='gambar' onChange={handleChangeImage} className='w-full border border-gray-300 rounded-md h-10 px-2 outline-0 text-sm' />
              </div>
            </div>
            <div className='mt-5'>
              <label className='text-sm' htmlFor='isi'>Isi</label>
              <textarea name='isi' id='isi' value={newsData.isi} onChange={handleChange} className='w-full border border-gray-300 rounded-md h-24 px-2 outline-0 mt-3 resize-none text-xs py-2 leading-relaxed' />
            </div>
            <button disabled={loading ? true : false} className={`${loading ? 'bg-orange-200 hover:bg-orange-200 cursor-auto' : 'bg-orange-400 hover:bg-orange-500 cursor-pointer'} transition-[background] px-4 py-2 text-sm rounded-md text-white mt-3`}>
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

export default CreateNewsModal