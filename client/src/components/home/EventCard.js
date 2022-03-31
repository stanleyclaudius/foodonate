import { useState, useEffect, useRef } from 'react'
import { AiFillCalendar, AiOutlineClockCircle } from 'react-icons/ai'
import { GoLocation } from 'react-icons/go'
import EventDetailModal from './../modal/EventDetailModal'

const EventCard = ({ item }) => {
  const [openEventDetailModal, setOpenEventDetailModal] = useState(false)

  const eventDetailModalRef = useRef()

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
      <div className='bg-orange-400 rounded-md flex items-center md:p-4 p-0 gap-5 flex-col md:flex-row'>
        <div className='bg-gray-300 md:w-[150px] h-[150px] w-full md:rounded-md rounded-tl-md rounded-tr-md'>
          <img src={item.gambar} alt={item.nama} className='w-full h-full rounded-md object-cover' />
        </div>
        <div className='flex-[2] text-white pb-7 md:pb-0'>
          <div className='flex mb-3 items-center justify-between'>
            <h1 className='font-medium text-lg'>{item.nama}</h1>
            <p>{item.donator.nama}</p>
          </div>
          <p className='flex items-center gap-2 mb-3 capitalize'>
            <GoLocation />
            {item.lokasi}
          </p>
          <div className='flex items-center gap-5 mb-4'>
            <p className='flex items-center gap-2'>
              <AiFillCalendar />
              {new Date(item.tanggal).toLocaleDateString()}
            </p>
            <p className='flex items-center gap-2'>
              <AiOutlineClockCircle />
              {item.waktuMulai} - {item.waktuSelesai}
            </p>
          </div>
          <button onClick={() => setOpenEventDetailModal(true)} className='bg-white text-orange-500 text-sm px-4 py-2 rounded-md shadow-xl'>View Detail</button>
        </div>
      </div>

      <EventDetailModal
        openEventDetailModal={openEventDetailModal}
        setOpenEventDetailModal={setOpenEventDetailModal}
        eventDetailModalRef={eventDetailModalRef}
        selectedItem={item}
      />
    </>
  )
}

export default EventCard