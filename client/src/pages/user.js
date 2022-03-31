import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, deleteUser } from './../redux/actions/userActions'
import Layout from './../components/admin/Layout'
import DeleteModal from './../components/modal/DeleteModal'
import NotFound from './../components/general/NotFound'
import Loader from './../components/general/Loader'

const User = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState()

  const deleteModalRef = useRef()

  const dispatch = useDispatch()
  const { auth, alert, user } = useSelector(state => state)

  const handleClickDelete = item => {
    setSelectedItem(item)
    setOpenDeleteModal(true)
  }

  const handleDeleteUser = async() => {
    await dispatch(deleteUser(selectedItem._id, auth.accessToken))
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
    dispatch(getUser(auth.accessToken))
  }, [dispatch, auth.accessToken])

  if (auth.user?.role !== 'admin') {
    return <NotFound />
  }

  return (
    <>
      <Layout>
        <h1 className='text-xl text-orange-400 font-medium'>Daftar Pengguna</h1>
        {
          alert.loading
          ? <Loader size='xl' />
          : (
            <>
              {
                user.length === 0
                ? (
                  <div className='mt-6 bg-red-500 text-sm text-white w-fit rounded-md px-6 py-3'>No data found</div>
                )
                : (
                  <div className='overflow-x-auto mt-6'>
                    <table className='w-full'>
                      <thead>
                        <tr className='text-sm bg-orange-400 text-white'>
                          <th className='p-3'>No</th>
                          <th>Nama</th>
                          <th>Username</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          user.map((item, idx) => (
                            <tr className='text-sm text-center bg-gray-100'>
                              <td className='p-3'>{idx + 1}</td>
                              <td>{item.nama}</td>
                              <td>{item.username}</td>
                              <td>
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

      <DeleteModal
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        deleteModalRef={deleteModalRef}
        onClick={handleDeleteUser}
      />
    </>
  )
}

export default User