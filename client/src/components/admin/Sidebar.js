import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { BsPatchCheckFill } from 'react-icons/bs'
import { FaBuilding, FaTachometerAlt, FaUser } from 'react-icons/fa'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { BiNews } from 'react-icons/bi'

const Sidebar = () => {
  const { page } = useParams()

  const { auth } = useSelector(state => state)
  
  return (
    <div className='bg-orange-400 pt-[72px]'>
      {
        auth.user?.role === 'admin'
        ? (
          <>
            <Link to='/approval' className={`block p-5 ${page === 'approval' ? 'bg-orange-600' : undefined} hover:bg-orange-600 cursor-pointer transition-[background]`}>
              <BsPatchCheckFill className='text-xl text-white' />
            </Link>
            <Link to='/donator' className={`block p-5 ${page === 'donator' ? 'bg-orange-600' : undefined} hover:bg-orange-600 cursor-pointer transition-[background]`}>
              <FaBuilding className='text-xl text-white' />
            </Link>
            <Link to='/user' className={`block p-5 ${page === 'user' ? 'bg-orange-600' : undefined} hover:bg-orange-600 cursor-pointer transition-[background]`}>
              <FaUser className='text-xl text-white' />
            </Link>
            <Link to='/news' className={`block p-5 ${page === 'news' ? 'bg-orange-600' : undefined} hover:bg-orange-600 cursor-pointer transition-[background]`}>
              <BiNews className='text-xl text-white' />
            </Link>
            <Link to='/all_event' className={`block p-5 ${page === 'all_event' ? 'bg-orange-600' : undefined} hover:bg-orange-600 cursor-pointer transition-[background]`}>
              <AiOutlineClockCircle className='text-xl text-white' />
            </Link>
          </>
        )
        : (
          <>
            <Link to='/overview' className={`block p-5 ${page === 'overview' ? 'bg-orange-600' : undefined} hover:bg-orange-600 cursor-pointer transition-[background]`}>
              <FaTachometerAlt className='text-xl text-white' />
            </Link>
            <Link to='/event' className={`block p-5 ${page === 'event' ? 'bg-orange-600' : undefined} hover:bg-orange-600 cursor-pointer transition-[background]`}>
              <AiOutlineClockCircle className='text-xl text-white' />
            </Link>
          </>
        )
      }
    </div>
  )
}

export default Sidebar