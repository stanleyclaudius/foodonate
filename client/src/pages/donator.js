import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteDonator, getDonator } from './../redux/actions/donatorActions'
import Layout from './../components/admin/Layout'
import DeleteModal from './../components/modal/DeleteModal'
import DonatorDetailModal from './../components/modal/DonatorDetailModal'
import NotFound from './../components/general/NotFound'
import Loader from './../components/general/Loader'

const Donator = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openDetailModal, setOpenDetailModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState()

  const deleteModalRef = useRef()
  const detailModalRef = useRef()

  const dispatch = useDispatch()
  const { auth, alert, donator } = useSelector(state => state)

  const handleClickDetail = item => {
    setSelectedItem(item)
    setOpenDetailModal(true)
  }

  const handleClickDelete = item => {
    setSelectedItem(item)
    setOpenDeleteModal(true)
  }

  const handleDeleteDonator = async() => {
    await dispatch(deleteDonator(selectedItem._id, auth.accessToken))
    setOpenDeleteModal(false)
    setSelectedItem()
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
    dispatch(getDonator(auth.accessToken))
  }, [dispatch, auth.accessToken])

  if (auth.user?.role !== 'admin') {
    return <NotFound />
  }

  return (
    <>
      <Layout>
        <h1 className='text-xl text-orange-400 font-medium'>Daftar Donatur</h1>
        {
          alert.loading
          ? <Loader size='xl' />
          : (
            <>
              {
                donator.length === 0
                ? (
                  <div className='mt-6 bg-red-500 text-sm text-white w-fit rounded-md px-6 py-3'>No data found</div>
                )
                : (
                  <div className='overflow-x-auto mt-6'>
                    <table className='w-full'>
                      <thead>
                        <tr className='text-sm bg-orange-400 text-white'>
                          <th className='p-3'>No</th>
                          <th>Nama Donatur</th>
                          <th>Nama Pemilik</th>
                          <th>Alamat</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          donator.map((item, idx) => (
                            <tr className='text-sm text-center bg-gray-100'>
                              <td className='p-3'>{idx + 1}</td>
                              <td>{item.nama}</td>
                              <td>{item.pemilik}</td>
                              <td>{item.alamat}</td>
                              <td>
                                <button onClick={() => handleClickDetail(item)} className='bg-blue-400 px-2 py-1 text-white text-xs rounded-md mr-3 hover:bg-blue-500 transition-[background]'>Detail</button>
                                <button onClick={() => handleClickDelete(item)} className='bg-red-400 px-2 py-1 text-white text-xs rounded-md mr-3 hover:bg-red-500 transition-[background]'>Delete</button>
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

      <DonatorDetailModal
        openDonatorDetailModal={openDetailModal}
        setOpenDonatorDetailModal={setOpenDetailModal}
        donatorDetailModalRef={detailModalRef}
        selectedItem={selectedItem}
      />

      <DeleteModal
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        deleteModalRef={deleteModalRef}
        onClick={handleDeleteDonator}
      />
    </>
  )
}

export default Donator