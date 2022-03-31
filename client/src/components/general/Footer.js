import { AiOutlineInstagram } from 'react-icons/ai'
import { RiTwitterLine } from 'react-icons/ri'
import { FiMail } from 'react-icons/fi'

const Footer = () => {
  return (
    <div className='md:px-32 md:py-12 p-8 bg-orange-400 mt-20 flex flex-col md:flex-row justify-between'>
      <div className='text-white flex-1'>
        <h1 className='text-2xl font-medium mb-4'>Contact Us</h1>
        <p className='flex items-center gap-3 mb-2'>
          <AiOutlineInstagram />
          foodonate
        </p>
        <p className='flex items-center gap-3 mb-2'>
          <RiTwitterLine />
          foodonate
        </p>
        <p className='flex items-center gap-3 mb-5'>
          <FiMail />
          foodonate@gmail.com
        </p>
        <p className='font-light text-sm'>Copyright 2022. All rights reserved.</p>
      </div>
      <div className='text-white flex-1 mt-8 md:mt-0'>
        <h1 className='text-2xl font-medium mb-4'>About</h1>
        <div>
          <p>Foodonate merupakan platform berbagi makanan gratis di seluruh Indonesia yang dilakukan oleh para orang baik untuk membantu masyarakata yang membutuhkan.</p>
        </div>
      </div>
    </div>
  )
}

export default Footer