import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='w-full h-screen flex-col flex items-center justify-center'>
      <p className='text-xl'>
        404 | Not Found
      </p>
      <Link to='/' className='bg-orange-400 hover:bg-orange-500 text-white rounded-md px-4 py-3 transition-[background] mt-5'>Back to Home</Link>
    </div>
  )
}

export default NotFound