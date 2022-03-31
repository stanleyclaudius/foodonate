import { useState, useEffect, useRef } from 'react'
import NewsDetailModal from './../modal/NewsDetailModal'

const NewsCard = ({ item }) => {
  const [openNewsDetailModal, setOpenNewsDetailModal] = useState(false)

  const newsDetailModalRef = useRef()

  useEffect(() => {
    const checkIfClickedOutside = e => {
      if (openNewsDetailModal && newsDetailModalRef.current && !newsDetailModalRef.current.contains(e.target)) {
        setOpenNewsDetailModal(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openNewsDetailModal])

  return (
    <>
      <div className='bg-orange-400 rounded-md shadow-lg'>
        <div className='w-full bg-gray-300 h-[180px] rounded-t-md rounded-tr-md'>
          <img src={item.gambar} alt={item.judul} className='w-full h-full rounded-t-md object-cover' />
        </div>
        <div className='p-5'>
          <h1 className='text-white font-medium text-lg mb-2'>{item.judul}</h1>
          <button onClick={() => setOpenNewsDetailModal(true)} className='bg-white text-orange-500 rounded-md px-4 py-2 shadow-xl text-sm'>View Detail</button>
        </div>
      </div>

      <NewsDetailModal
        openNewsDetailModal={openNewsDetailModal}
        setOpenNewsDetailModal={setOpenNewsDetailModal}
        newsDetailModalRef={newsDetailModalRef}
        selectedItem={item}
      />
    </>
  )
}

export default NewsCard