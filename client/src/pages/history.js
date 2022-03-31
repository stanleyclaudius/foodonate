import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTicket } from './../redux/actions/ticketActions'
import Navbar from './../components/general/Navbar'
import Footer from './../components/general/Footer'
import TicketDetailModal from './../components/modal/TicketDetailModal'
import Loader from './../components/general/Loader'

const History = () => {
  const [openTicketDetailModal, setOpenTicketDetailModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})

  const ticketDetailModalRef = useRef()

  const dispatch = useDispatch()
  const { auth, alert, ticket } = useSelector(state => state)

  const handleClickDetail = item => {
    setOpenTicketDetailModal(true)
    setSelectedItem(item)
  }

  useEffect(() => {
    const checkIfClickedOutside = e => {
      if (openTicketDetailModal && ticketDetailModalRef.current && !ticketDetailModalRef.current.contains(e.target)) {
        setOpenTicketDetailModal(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openTicketDetailModal])

  useEffect(() => {
    dispatch(getTicket(auth.accessToken))
  }, [dispatch, auth])

  return (
    <>
      <div>
        <Navbar />
        <h1 className='px-10 py-8 font-medium text-2xl text-orange-400'>Tiket Event</h1>
        {
          alert.loading
          ? <Loader size='xl' />
          : (
            <>
              {
                ticket.length === 0
                ? (
                  <div className='mx-10 bg-red-500 text-sm text-white w-fit rounded-md px-6 py-3'>No data found</div>
                )
                : (
                  <div className='px-10 overflow-x-auto'>
                    <table className='w-full'>
                      <thead>
                        <tr className='text-sm bg-orange-400 text-white'>
                          <th className='p-3'>No</th>
                          <th>Nama Event</th>
                          <th>Lokasi</th>
                          <th>Tanggal</th>
                          <th>Waktu</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          ticket.map((item, idx) => (
                            <tr key={item._id} className='text-sm text-center bg-gray-100'>
                              <td className='p-3'>{idx + 1}</td>
                              <td>{item.event?.nama}</td>
                              <td>{item.event?.lokasi}</td>
                              <td>{new Date(item.event?.tanggal).toLocaleDateString()}</td>
                              <td>{item.event?.waktuMulai} - {item.event?.waktuSelesai}</td>
                              <td>
                                <button onClick={() => handleClickDetail(item)} className='bg-blue-400 px-2 py-1 text-white text-xs rounded-md mr-3 hover:bg-blue-500 transition-[background]'>Detail</button>
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                )
              }
            </>
          )
        }
        <Footer />
      </div>

      <TicketDetailModal
        openTicketDetailModal={openTicketDetailModal}
        setOpenTicketDetailModal={setOpenTicketDetailModal}
        ticketDetailModalRef={ticketDetailModalRef}
        selectedItem={selectedItem}
      />
    </>
  )
}

export default History