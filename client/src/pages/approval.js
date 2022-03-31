import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUnverifiedDonator, verifyDonator, rejectDonator } from './../redux/actions/approvalActions'
import Layout from './../components/admin/Layout'
import Loader from './../components/general/Loader'
import DonatorDetailModal from './../components/modal/DonatorDetailModal'
import NotFound from './../components/general/NotFound'

const Approval = () => {
  const [openDonatorDetailModal, setOpenDonatorDetailModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})

  const donatorDetailModalRef = useRef()

  const dispatch = useDispatch()
  const { auth, alert, approval } = useSelector(state => state)

  const handleClickDetail = item => {
    setSelectedItem(item)
    setOpenDonatorDetailModal(true)
  }

  useEffect(() => {
    const checkIfClickedOutside = e => {
      if (openDonatorDetailModal && donatorDetailModalRef.current && !donatorDetailModalRef.current.contains(e.target)) {
        setOpenDonatorDetailModal(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openDonatorDetailModal])

  useEffect(() => {
    dispatch(getUnverifiedDonator(auth.accessToken))
  }, [dispatch, auth.accessToken])

  if (auth.user?.role !== 'admin') {
    return <NotFound />
  }

  return (
    <>
      <Layout>
        <h1 className='text-xl text-orange-400 font-medium'>Konfirmasi Donatur</h1>
        {
          alert.loading
          ? (
            <Loader size='xl' />
          )
          : (
            <>
              {
                approval.length === 0
                ? (
                  <div className='mt-6 bg-red-500 text-sm text-white w-fit rounded-md px-6 py-3'>No data found</div>
                )
                : (
                  <div className='overflow-x-auto mt-6'>
                    <table className='w-full'>
                      <thead>
                        <tr className='text-sm bg-orange-400 text-white'>
                          <th className='p-3'>No</th>
                          <th>Nama Organisasi</th>
                          <th>Nama Pemilik</th>
                          <th>Tanggal Registrasi</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          approval.map(item => (
                            <tr className='text-sm text-center bg-gray-100'>
                              <td className='p-3'>1</td>
                              <td>{item.nama}</td>
                              <td>{item.pemilik}</td>
                              <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                              <td>
                                <button className='bg-blue-400 px-2 py-1 text-white text-xs rounded-md mr-3 hover:bg-blue-500 transition-[background]' onClick={() => handleClickDetail(item)}>Detail</button>
                                <button className='bg-green-400 px-2 py-1 text-white text-xs rounded-md mr-3 hover:bg-green-500 transition-[background]' onClick={() => dispatch(verifyDonator(item._id, auth.accessToken))}>Terima</button>
                                <button onClick={() => dispatch(rejectDonator(item._id, auth.accessToken))} className='bg-red-400 px-2 py-1 text-white text-xs rounded-md hover:bg-red-500 transition-[background]'>Tolak</button>
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
        openDonatorDetailModal={openDonatorDetailModal}
        setOpenDonatorDetailModal={setOpenDonatorDetailModal}
        donatorDetailModalRef={donatorDetailModalRef}
        selectedItem={selectedItem}
      />
    </>
  )
}

export default Approval