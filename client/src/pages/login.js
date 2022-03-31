import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { GLOBAL_TYPES } from './../redux/types/globalTypes'
import { login } from './../redux/actions/authActions'
import Loader from './../components/general/Loader'

const Login = () => {
  const [userData, setUserData] = useState({
    username: '',
    kataSandi: ''
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { alert, auth } = useSelector(state => state)

  const handleSubmit = e => {
    e.preventDefault()
    if (!userData.username || !userData.kataSandi) {
      return dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          errors: 'Kolom username dan kata sandi wajib diisi.'
        }
      })
    }

    dispatch(login(userData))
  }

  const handleChange = e => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  useEffect(() => {
    if (auth.accessToken) {
      navigate('/')
    }
  }, [navigate, auth.accessToken])

  return (
    <div className='flex h-screen'>
      <div className='flex-1 bg-gray-200 hidden md:block'>
        <img src={`${process.env.PUBLIC_URL}/images/auth.png`} alt='Foodonate' className='h-full w-full object-cover' />
      </div>
      <div className='flex-1 p-16'>
        <h1 className='text-2xl font-medium'>Masuk</h1>
        <form onSubmit={handleSubmit}>
          <div className='mt-8'>
            <label htmlFor='username'>Username</label>
            <input type='text' id='username' name='username' value={userData.username} onChange={handleChange} autoComplete='off' className='border border-gray-300 rounded-md px-3 w-full h-10 outline-0 text-sm mt-3' />
          </div>
          <div className='mt-5'>
            <label htmlFor='kataSandi'>Kata Sandi</label>
            <input type='password' id='kataSandi' name='kataSandi' value={userData.kataSandi} onChange={handleChange} autoComplete='off' className='border border-gray-300 rounded-md px-3 w-full h-10 outline-0 text-sm mt-3' />
          </div>
          <button disabled={alert.loading ? true : false} className={`${alert.loading ? 'bg-orange-200 hover:bg-orange-200 cursor-auto' : 'bg-orange-400 hover:bg-orange-500 cursor-pointer'} text-white px-3 py-2 rounded-md text-sm transition-[background] mt-7`}>
            {
              alert.loading
              ? <Loader />
              : 'Masuk'
            }
          </button>
        </form>
        <p className='text-sm mt-6 text-gray-700'>Belum mempunyai akun? Daftar <Link to='/register' className='text-blue-700 underline'>disini</Link></p>
      </div>
    </div>
  )
}

export default Login