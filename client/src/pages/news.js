import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getNews, deleteNews } from './../redux/actions/newsActions'
import Layout from './../components/admin/Layout'
import CreateNewsModal from './../components/modal/CreateNewsModal'
import Loader from './../components/general/Loader'
import NotFound from './../components/general/NotFound'
import NewsDetailModal from './../components/modal/NewsDetailModal'
import DeleteModal from './../components/modal/DeleteModal'

const News = () => {
  const [openCreateNewsModal, setOpenCreateNewsModal] = useState(false)
  const [openNewsDetailModal, setOpenNewsDetailModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState()

  const createNewsModalRef = useRef()
  const newsDetailModalRef = useRef()
  const deleteModalRef = useRef()

  const dispatch = useDispatch()
  const { auth, alert, news } = useSelector(state => state)

  const handleClickDetail = item => {
    setOpenNewsDetailModal(true)
    setSelectedItem(item)
  }

  const handleClickCreate = () => {
    setSelectedItem()
    setOpenCreateNewsModal(true)
  }

  const handleClickUpdate = item => {
    setSelectedItem(item)
    setOpenCreateNewsModal(true)
  }
  
  const handleClickDelete = item => {
    setSelectedItem(item)
    setOpenDeleteModal(true)
  }

  const handleDeleteNews = async() => {
    await dispatch(deleteNews(selectedItem._id, auth.accessToken))
    setOpenDeleteModal(false)
    setSelectedItem()
  }

  useEffect(() => {
    const checkIfClickedOutside = e => {
      if (openCreateNewsModal && createNewsModalRef.current && !createNewsModalRef.current.contains(e.target)) {
        setOpenCreateNewsModal(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openCreateNewsModal])

  useEffect(() => {
    const checkIfClickedOutside = e => {
      if (openNewsDetailModal && newsDetailModalRef.current && !newsDetailModalRef.current.contains(e.target)) {
        setOpenNewsDetailModal(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openNewsDetailModal])

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
    dispatch(getNews())
  }, [dispatch])

  if (auth.user?.role !== 'admin') {
    return <NotFound />
  }

  return (
    <>
      <Layout>
        <div className='flex items-center justify-between'>
          <h1 className='text-xl text-orange-400 font-medium'>Daftar Berita</h1>
          <button onClick={handleClickCreate} className='bg-orange-400 hover:bg-orange-500 transition-[background] px-4 py-2 text-white text-sm rounded-md'>Tambah Berita</button>
        </div>
        {
          alert.loading
          ? (
            <Loader size='xl' />
          )
          : (
            <>
              {
                news.length === 0
                ? (
                  <div className='mt-6 bg-red-500 text-sm text-white w-fit rounded-md px-6 py-3'>No data found</div>
                )
                : (
                  <div className='overflow-x-auto mt-6'>
                    <table className='w-full'>
                      <thead>
                        <tr className='text-sm bg-orange-400 text-white'>
                          <th className='p-3'>No</th>
                          <th>Judul</th>
                          <th>Tanggal</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          news.map((item, idx) => (
                            <tr key={item._id} className='text-sm text-center bg-gray-100'>
                              <td className='p-3'>{idx + 1}</td>
                              <td>{item.judul}</td>
                              <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                              <td>
                                <button onClick={() => handleClickUpdate(item)} className='bg-yellow-500 hover:bg-yellow-600 transition-[background] mr-3 px-2 py-1 text-white text-xs rounded-md'>Update</button>
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
      
      <CreateNewsModal
        openCreateNewsModal={openCreateNewsModal}
        setOpenCreateNewsModal={setOpenCreateNewsModal}
        createNewsModalRef={createNewsModalRef}
        selectedItem={selectedItem}
      />

      <NewsDetailModal
        openNewsDetailModal={openNewsDetailModal}
        setOpenNewsDetailModal={setOpenNewsDetailModal}
        newsDetailModalRef={newsDetailModalRef}
        selectedItem={selectedItem}
      />

      <DeleteModal
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        deleteModalRef={deleteModalRef}
        onClick={handleDeleteNews}
      />
    </>
  )
}

export default News