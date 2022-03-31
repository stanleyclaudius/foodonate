import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEventByDonator, deleteEvent } from './../redux/actions/eventActions'
import Layout from './../components/admin/Layout'
import DeleteModal from './../components/modal/DeleteModal'
import EventDetailModal from './../components/modal/EventDetailModal'
import CreateEventModal from './../components/modal/CreateEventModal'
import Loader from './../components/general/Loader'
import NotFound from './../components/general/NotFound'
import EventRegistrationModal from './../components/modal/EventRegistrationModal'

const Event = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openDetailModal, setOpenDetailModal] = useState(false)
  const [openCreateEventModal, setOpenCreateEventModal] = useState(false)
  const [openEventRegistrationModal, setOpenEventRegistrationModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState()

  const [events, setEvents] = useState([])

  const deleteModalRef = useRef()
  const detailModalRef = useRef()
  const createEventModalRef = useRef()
  const eventRegistrationModalRef = useRef()

  const dispatch = useDispatch()
  const { auth, alert, donatorEvent } = useSelector(state => state)

  const handleClickCreate = () => {
    setSelectedItem()
    setOpenCreateEventModal(true)
  }

  const handleClickPendaftar = item => {
    setSelectedItem(item)
    setOpenEventRegistrationModal(true)
  }

  const handleClickUpdate = item => {
    setSelectedItem(item)
    setOpenCreateEventModal(true)
  }

  const handleClickDelete = item => {
    setSelectedItem(item)
    setOpenDeleteModal(true)
  }

  const handleDeleteEvent = async() => {
    await dispatch(deleteEvent(selectedItem._id, auth.accessToken))
    setOpenDeleteModal(false)
    setSelectedItem()
  }

  const handleClickDetail = item => {
    setSelectedItem(item)
    setOpenDetailModal(true)
  }

  useEffect(() => {
    const checkIfClickedOutside = e => {
      if (openDeleteModal && deleteModalRef.current && !deleteModalRef.current.contains(e.target)) {
        setOpenDeleteModal(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openDeleteModal])

  useEffect(() => {
    const checkIfClickedOutside = e => {
      if (openDetailModal && detailModalRef.current && !detailModalRef.current.contains(e.target)) {
        setOpenDetailModal(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openDetailModal])

  useEffect(() => {
    const checkIfClickedOutside = e => {
      if (openCreateEventModal && createEventModalRef.current && !createEventModalRef.current.contains(e.target)) {
        setOpenCreateEventModal(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openCreateEventModal])

  useEffect(() => {
    const checkIfClickedOutside = e => {
      if (openEventRegistrationModal && eventRegistrationModalRef.current && !eventRegistrationModalRef.current.contains(e.target)) {
        setOpenEventRegistrationModal(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openEventRegistrationModal])

  useEffect(() => {
    dispatch(getEventByDonator(auth.accessToken))
  }, [dispatch, auth.accessToken])

  useEffect(() => {
    setEvents(donatorEvent.data)
  }, [donatorEvent.data])

  if (auth.user?.role !== 'donatur') {
    return <NotFound />
  }

  return (
    <>
      <Layout>
        <div className='flex items-center justify-between mb-8'>
          <h1 className='text-xl text-orange-400 font-medium'>Daftar Event</h1>
          <button onClick={handleClickCreate} className='bg-orange-400 hover:bg-orange-500 transition-[background] px-3 py-2 text-sm text-white rounded-md'>Tambah Event</button>
        </div>
        {
          alert.loading
          ? <Loader size='xl' />
          : (
            <>
              {
                events.length === 0
                ? (
                  <div className='mt-6 bg-red-500 text-sm text-white w-fit rounded-md px-6 py-3'>No data found</div>
                )
                : (
                  <div className='overflow-x-auto mt-6'>
                    <table className='w-full'>
                      <thead>
                        <tr className='text-sm bg-orange-400 text-white'>
                          <th className='p-3'>No</th>
                          <th>Nama Event</th>
                          <th>Tanggal</th>
                          <th>Waktu</th>
                          <th>Lokasi</th>
                          <th>Kapasitas</th>
                          <th>Jumlah Pendaftar</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          events.map((item, idx) => (
                            <tr key={item._id} className='text-sm text-center bg-gray-100'>
                              <td className='p-3'>{idx + 1}</td>
                              <td>{item.nama}</td>
                              <td>{new Date(item.tanggal).toLocaleDateString()}</td>
                              <td>{item.waktuMulai} - {item.waktuSelesai}</td>
                              <td>{item.lokasi}</td>
                              <td>{item.kapasitas}</td>
                              <td>{item.pendaftar?.length}</td>
                              <td>
                                <button onClick={() => handleClickPendaftar(item)} className='bg-orange-400 px-2 py-1 text-white text-xs rounded-md hover:bg-orange-500 transition-[background] mr-3'>Pendaftar</button>
                                <button onClick={() => handleClickUpdate(item)} className='bg-yellow-500 px-2 py-1 text-white text-xs rounded-md hover:bg-yellow-600 transition-[background] mr-3'>Update</button>
                                <button onClick={() => handleClickDetail(item)} className='bg-blue-400 px-2 py-1 text-white text-xs rounded-md mr-3 hover:bg-blue-500 transition-[background]'>Detail</button>
                                <button onClick={() => handleClickDelete(item)} className='bg-red-400 px-2 py-1 text-white text-xs rounded-md hover:bg-red-500 transition-[background]'>Hapus</button>
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
      </Layout>

      <EventRegistrationModal
        openModal={openEventRegistrationModal}
        setOpenModal={setOpenEventRegistrationModal}
        modalRef={eventRegistrationModalRef}
        pendaftar={selectedItem?.pendaftar}
      />

      <CreateEventModal
        openCreateEventModal={openCreateEventModal}
        setOpenCreateEventModal={setOpenCreateEventModal}
        createEventModalRef={createEventModalRef}
        selectedItem={selectedItem}
      />

      <EventDetailModal
        openEventDetailModal={openDetailModal}
        setOpenEventDetailModal={setOpenDetailModal}
        eventDetailModalRef={detailModalRef}
        selectedItem={selectedItem}
        hideButton={true}
      />

      <DeleteModal
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        deleteModalRef={deleteModalRef}
        onClick={handleDeleteEvent}
      />
    </>
  )
}

export default Event