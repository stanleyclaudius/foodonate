import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { GLOBAL_TYPES } from './../redux/types/globalTypes'
import SelectRoleModal from './../components/modal/SelectRoleModal'

const Register = () => {
  const [openSelectRoleModal, setOpenSelectRoleModal] = useState(false)
  const [userData, setUserData] = useState({
    nama: '',
    username: '',
    kataSandi: '',
    konfirmasiKataSandi: ''
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { auth } = useSelector(state => state)

  const selectRoleModalRef = useRef()

  const handleChange = e => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!userData.nama || !userData.username || !userData.kataSandi || !userData.konfirmasiKataSandi) {
      return dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          errors: 'Kolom nama, username, kata sandi, dan juga konfirmasi kata sandi wajib diisi.'
        }
      })
    }

    if (userData.kataSandi.length < 8) {
      return dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          errors: 'Kata sandi harus mempunyai minimal 8 karakter.'
        }
      })
    }

    if (userData.kataSandi !== userData.konfirmasiKataSandi) {
      return dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          errors: 'Konfirmasi kata sandi tidak sesuai.'
        }
      })
    }
    
    setOpenSelectRoleModal(true)
  }

  useEffect(() => {
    const checkIfClickedOutside = e => {
      if (openSelectRoleModal && selectRoleModalRef.current && !selectRoleModalRef.current.contains(e.target)) {
        setOpenSelectRoleModal(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openSelectRoleModal])

  useEffect(() => {
    if (auth.accessToken) {
      navigate('/')
    }
  }, [navigate, auth.accessToken])

  return (
    <>
      <div className='flex h-screen'>
        <div className='flex-1 bg-gray-200 hidden md:block'>
          <img src={`${process.env.PUBLIC_URL}/images/auth.png`} alt='Foodonate' className='h-full w-full object-cover' />
        </div>
        <div className='flex-1 py-14 px-16'>
          <h1 className='text-2xl font-medium'>Daftar</h1>
          <form onSubmit={handleSubmit}>
            <div className='mt-8'>
              <label htmlFor='nama'>Nama</label>
              <input type='text' id='nama' name='nama' value={userData.nama} onChange={handleChange} autoComplete='off' className='border border-gray-300 rounded-md px-3 w-full h-10 outline-0 text-sm mt-3' />
            </div>
            <div className='mt-5'>
              <label htmlFor='username'>Username</label>
              <input type='text' id='username' name='username' value={userData.username} onChange={handleChange} autoComplete='off' className='border border-gray-300 rounded-md px-3 w-full h-10 outline-0 text-sm mt-3' />
            </div>
            <div className='mt-5'>
              <label htmlFor='kataSandi'>Kata Sandi</label>
              <input type='password' id='kataSandi' name='kataSandi' value={userData.kataSandi} onChange={handleChange} autoComplete='off' className='border border-gray-300 rounded-md px-3 w-full h-10 outline-0 text-sm mt-3' />
            </div>
            <div className='mt-5'>
              <label htmlFor='konfirmasiKataSandi'>Konfirmasi Kata Sandi</label>
              <input type='password' id='konfirmasiKataSandi' name='konfirmasiKataSandi' value={userData.konfirmasiKataSandi} onChange={handleChange} autoComplete='off' className='border border-gray-300 rounded-md px-3 w-full h-10 outline-0 text-sm mt-3' />
            </div>
            <button className='bg-orange-400 text-white px-3 py-2 rounded-md text-sm hover:bg-orange-500 transition-[background] mt-7'>Daftar</button>
          </form>
          <p className='text-sm mt-6 text-gray-700'>Sudah memiliki akun? Login <Link to='/login' className='text-blue-700 underline'>disini</Link></p>
        </div>
      </div>

      <SelectRoleModal
        openSelectRoleModal={openSelectRoleModal}
        setOpenSelectRoleModal={setOpenSelectRoleModal}
        selectRoleModalRef={selectRoleModalRef}
        userData={userData}
      />
    </>
  )
}

export default Register