import { useState, useEffect, useRef } from 'react'
import { AiFillCalendar, AiOutlineClockCircle } from 'react-icons/ai'
import { GoLocation } from 'react-icons/go'
import EventDetailModal from './../modal/EventDetailModal'

const DetailedEventCard = ({ item }) => {
  const [openEventDetailModal, setOpenEventDetailModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})

  const eventDetailModalRef = useRef()

  const handleClickDetail = () => {
    setOpenEventDetailModal(true)
    setSelectedItem(item)
  }

  useEffect(() => {
    const checkIfClickedOutside = e => {
      if (openEventDetailModal && eventDetailModalRef.current && !eventDetailModalRef.current.contains(e.target)) {
        setOpenEventDetailModal(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openEventDetailModal])

  return (
    <>
      <div onClick={handleClickDetail} className='cursor-pointer mb-10 bg-orange-400 rounded-md flex md:flex-row flex-col items-center gap-7 md:p-8 p-0'>
        <div className='md:h-[160px] h-[200px] bg-gray-300 md:rounded-md rounded-t-md md:w-[200px] w-full'>
          <img src={item.gambar} alt={item.nama} className='rounded-md w-full h-full object-cover' />
        </div>
        <div className='text-white md:p-0 px-8 pb-8 w-full'>
          <div className='flex md:flex-row flex-col md:items-center md:justify-between mb-5'>
            <h1 className='text-2xl font-medium'>{item.nama}</h1>
            <p className='md:text-xl md:mt-0 mt-2 text-md'>{item.donator?.nama}</p>
          </div>
          <div className='mb-5'>
            <p>
              {item.deskripsi}
            </p>
          </div>
          <div className='flex md:flex-row flex-col md:items-center gap-10'>
            <p className='flex items-center gap-3'>
              <GoLocation />
              {item.lokasi}
            </p>
            <p className='flex items-center gap-3'>
              <AiFillCalendar />
              {new Date(item.tanggal).toLocaleDateString()}
            </p>
            <p className='flex items-center gap-3'>
              <AiOutlineClockCircle />
              {item.waktuMulai} - {item.waktuSelesai}
            </p>
          </div>
        </div>
      </div>

      <EventDetailModal
        openEventDetailModal={openEventDetailModal}
        setOpenEventDetailModal={setOpenEventDetailModal}
        eventDetailModalRef={eventDetailModalRef}
        selectedItem={selectedItem}
      />
    </>
  )
}

export default DetailedEventCard