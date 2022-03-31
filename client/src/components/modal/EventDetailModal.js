import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GoLocation } from 'react-icons/go'
import { AiFillCalendar, AiOutlineClockCircle, AiOutlineClose } from 'react-icons/ai'
import { GLOBAL_TYPES } from './../../redux/types/globalTypes'
import { registerEvent } from './../../redux/actions/eventActions'
import Loader from './../general/Loader'

const EventDetailModal = ({
  openEventDetailModal,
  setOpenEventDetailModal,
  eventDetailModalRef,
  selectedItem,
  hideButton
}) => {
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const { auth } = useSelector(state => state)

  const handleRegisterEvent = async() => {
    if (!auth.accessToken) {
      return dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          errors: 'Silahkan melakukan login untuk mendaftar event.'
        }
      })
    }
    setLoading(true)
    await dispatch(registerEvent(selectedItem._id, auth))
    setLoading(false)
    setOpenEventDetailModal(false)
  }

  return (
    <div className={`fixed top-0 left-0 right-0 bottom-0 ${openEventDetailModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} transition-[opacity] flex items-center z-[999] justify-center p-4 bg-[rgba(0,0,0,.7)]`}>
      <div ref={eventDetailModalRef} className={`bg-white w-full ${openEventDetailModal ? 'translate-y-0' : '-translate-y-12'} transition-[transform] max-w-[550px] rounded-md`}>
        <div className='flex items-center justify-between border-b border-gray-300 px-5 py-3'>
          <h1>Detail Event {selectedItem?.nama}</h1>
          <AiOutlineClose onClick={() => setOpenEventDetailModal(false)} className='cursor-pointer text-lg' />
        </div>
        <div className='p-5'>
          <div className='w-full h-[200px] bg-gray-300 rounded-md'>
            <img src={selectedItem?.gambar} alt={selectedItem?.nama} className='rounded-md w-full h-full object-cover' />
          </div>
          <div>
            <p className='text-justify text-sm text-gray-800 mt-3 leading-loose'>
              {selectedItem?.deskripsi}
            </p>
            <div className='flex items-center justify-between'>
              <p className=' flex items-center gap-3 mt-3 text-sm text-gray-700 capitalize'>
                <GoLocation />
                {selectedItem?.lokasi}
              </p>
              <div className='flex text-sm text-gray-700 font-medium gap-3'>
                <p>Batas Registrasi</p>
                <p>{new Date(selectedItem?.batasRegistrasi).toLocaleDateString()}</p>
              </div>
            </div>
            <p className='flex items-center gap-3 mt-3 text-sm text-gray-700'>
              <AiFillCalendar />
              {new Date(selectedItem?.tanggal).toLocaleDateString()}
            </p>
            <p className='flex items-center gap-3 mt-3 text-sm text-gray-700'>
              <AiOutlineClockCircle />
              {selectedItem?.waktuMulai} - {selectedItem?.waktuSelesai}
            </p>
            {
              !hideButton &&
              <button
                onClick={handleRegisterEvent}
                disabled={loading ? true : false}
                className={`${loading ? 'bg-orange-200 hover:bg-orange-200 cursor-auto' : 'bg-orange-400 hover:bg-orange-500 cursor-pointer'} text-sm text-white w-full py-3 rounded-md transition-[background] mt-4`}
              >
                {
                  loading
                  ? <Loader />
                  : `Register (${selectedItem?.kapasitas - selectedItem?.pendaftar?.length} Slot Left)`
                }
              </button>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetailModal