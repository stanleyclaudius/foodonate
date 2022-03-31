import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineUser } from 'react-icons/ai'
import { MdLogout } from 'react-icons/md'
import { logout } from './../../redux/actions/authActions'
import EditProfileModal from './../modal/EditProfileModal'

const Navbar = () => {
  const [openEditProfileModal, setOpenEditProfileModal] = useState(false)
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)

  const avatarRef = useRef()
  const editProfileModalRef = useRef()

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const { auth } = useSelector(state => state)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  useEffect(() => {
    const checkIfClickedOutside = e => {
      if (isOpenDropdown && avatarRef.current && !avatarRef.current.contains(e.target)) {
        setIsOpenDropdown(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [isOpenDropdown])

  useEffect(() => {
    const checkIfClickedOutside = e => {
      if (openEditProfileModal && editProfileModalRef.current && !editProfileModalRef.current.contains(e.target)) {
        setOpenEditProfileModal(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openEditProfileModal])

  return (
    <>
      <div className='flex items-center justify-between pl-6 pr-14 py-4 bg-orange-400 flex-1'>
        <h1 className='text-xl font-medium text-white'>Foodonate {auth.user?.role === 'admin' ? 'Admin' : 'Donatur'}</h1>
        <div ref={avatarRef} className='relative'>
          <div className='w-10 h-10 rounded-full cursor-pointer outline outline-2 outline-offset-2 outline-gray-300' onClick={() => setIsOpenDropdown(!isOpenDropdown)}>
            <img src={auth.user?.avatar} alt={auth.user?.nama} className='w-full h-full rounded-full object-cover' />
          </div>
          <div className={`${isOpenDropdown ? 'scale-y-1' : 'scale-y-0'} origin-top transition-[transform] absolute top-[100%] right-0 w-[170px] bg-white rounded-t-md flex flex-col shadow-xl border border-gray-200 mt-3`}>
            <p onClick={() => setOpenEditProfileModal(true)} className='cursor-pointer flex items-center gap-3 border-b border-gray-300 rounded-t-md p-3 hover:bg-gray-100 transition-[background]'>
              <AiOutlineUser />
              Edit Profile
            </p>
            <p onClick={handleLogout} className='cursor-pointer flex items-center gap-3 border-b border-gray-300 p-3 hover:bg-gray-100 transition-[background] rounded-b-md'>
              <MdLogout />
              Logout
            </p>
          </div>
        </div>
      </div>

      <EditProfileModal
        openEditProfileModal={openEditProfileModal}
        setOpenEditProfileModal={setOpenEditProfileModal}
        editProfileModalRef={editProfileModalRef}
      />
    </>
  )
}

export default Navbar