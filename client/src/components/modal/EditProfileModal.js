import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editProfile } from './../../redux/actions/authActions'
import { GLOBAL_TYPES } from './../../redux/types/globalTypes'
import { AiOutlineClose } from 'react-icons/ai'
import Loader from './../general/Loader'

const EditProfileModal = ({
  openEditProfileModal,
  setOpenEditProfileModal,
  editProfileModalRef
}) => {
  const [userData, setUserData] = useState({
    nama: '',
    username: '',
    avatar: '',
    role: ''
  })
  const [gambar, setGambar] = useState('')
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const { auth } = useSelector(state => state)

  const handleChange = e => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  const handleChangeAvatar = e => {
    const files = e.target.files[0]
    setGambar(files)
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (!userData.nama) {
      return dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          errors: 'Field nama harus diisi.'
        }
      })
    }

    setLoading(true)
    await dispatch(editProfile({ ...userData, gambar }, auth))
    setLoading(false)
    setOpenEditProfileModal(false)
  }

  useEffect(() => {
    setUserData({
      nama: auth.user?.nama,
      username: auth.user?.username,
      role: auth.user?.role,
      avatar: auth.user?.avatar
    })
  }, [auth])

  return (
    <div className={`fixed top-0 left-0 right-0 bottom-0 ${openEditProfileModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} transition-[opacity] flex z-[999] items-center justify-center p-4 bg-[rgba(0,0,0,.7)]`}>
      <div ref={editProfileModalRef} className={`bg-white w-full ${openEditProfileModal ? 'translate-y-0' : '-translate-y-12'} transition-[transform] max-w-[500px] rounded-md`}>
        <div className='border-b border-gray-300 px-5 py-4 flex items-center justify-between'>
          <h1>Edit Profile</h1>
          <AiOutlineClose onClick={() => setOpenEditProfileModal(false)} className='cursor-pointer' />
        </div>
        <div className='p-5'>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor='nama' className='text-sm'>Nama</label>
              <input type='text' id='nama' name='nama' autoComplete='off' value={userData.nama} onChange={handleChange} className='h-10 px-2 w-full border border-gray-300 rounded-md text-sm mt-3 outline-0' />
            </div>
            <div className='mt-5'>
              <label htmlFor='username' className='text-sm'>Username</label>
              <input disabled={true} type='text' id='username' name='username' autoComplete='off' value={userData.username} onChange={handleChange} className='h-10 px-2 w-full border text-sm border-gray-300 rounded-md mt-3 outline-0' />
            </div>
            <div className='mt-5'>
              <label htmlFor='role' className='text-sm'>Role</label>
              <input disabled={true} type='text' id='role' name='role' autoComplete='off' value={userData.role} onChange={handleChange} className='h-10 px-2 w-full border border-gray-300 rounded-md text-sm mt-3 outline-0' />
            </div>
            <div className='mt-5'>
              <label htmlFor='username' className='text-sm'>Avatar</label>
              <div className='mt-3 flex gap-3'>
                <div className='w-24 h-20 rounded-md'>
                  <img src={gambar ? URL.createObjectURL(gambar) : userData.avatar} alt={userData.nama} className='rounded-md w-full h-full object-cover' />
                </div>
                <input type='file' accept='image/*' id='username' onChange={handleChangeAvatar} className='h-10 px-2 text-sm w-full border border-gray-300 rounded-md outline-0' />
              </div>
            </div>
            <button disabled={loading ? true : false} className={`${loading ? 'bg-orange-200 hover:bg-orange-200 cursor-auto' : 'bg-orange-400 hover:bg-orange-500 cursor-pointer'} transition-[background] px-4 py-2 text-sm text-white rounde-md rounded-md mt-3`}>
              {
                loading
                ? <Loader />
                : 'Simpan'
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditProfileModal