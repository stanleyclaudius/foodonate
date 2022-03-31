import { useState } from 'react'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

const Banner = () => {
  const [currPos, setCurrPos] = useState(3)

  const handleChangePos = type => {
    if (type === 'left') {
      const newPos = currPos - 1
      if (newPos < 1) {
        setCurrPos(3)
      } else {
        setCurrPos(newPos)
      }
    } else {
      const newPos = currPos + 1
      if (newPos > 3) {
        setCurrPos(1)
      } else {
        setCurrPos(newPos)
      }
    }
  }

  return (
    <div className='bg-orange-400 py-12 px-10 relative'>
      <h1 className='text-center text-white text-xl font-medium mb-10'>Langkah menerima donasi</h1>
      <div onClick={() => handleChangePos('left')} className='bg-white text-orange-500 rounded-full w-fit p-2 absolute top-[50%] left-3 cursor-pointer block md:hidden'>
        <AiOutlineLeft />
      </div>
      <div className='flex items-center justify-evenly'>
        <div className={`md:block ${currPos === 1 ? 'block' : 'hidden'}`}>
          <div className='bg-white rounded-full w-[250px] h-[250px] shadow-xl'>
            <img src={`${process.env.PUBLIC_URL}/images/firstStep.png`} alt='Foodonate' className='w-[700px] z-[99]' />
          </div>
          <p className='text-center text-white mt-7'>Cari donasi yang tersedia</p>
        </div>
        <div className='hidden md:block'>
          <img src={`${process.env.PUBLIC_URL}/images/arrow.png`} alt='Foodonate' className='w-[100px]' />
        </div>
        <div className={`md:block ${currPos === 2 ? 'block' : 'hidden'}`}>
          <div className='bg-white rounded-full w-[250px] h-[250px] shadow-xl flex items-center justify-center'>
            <img src={`${process.env.PUBLIC_URL}/images/secondStep.png`} alt='Foodonate' className='w-[210px] translate-y-4 ' />
          </div>
          <p className='text-center text-white mt-7'>Pihak donatur akan <br /> mempersiapkan paket donasi</p>
        </div>
        <div className='hidden md:block'>
          <img src={`${process.env.PUBLIC_URL}/images/arrow.png`} alt='Foodonate' className='w-[100px]' />
        </div>
        <div className={`md:block ${currPos === 3 ? 'block' : 'hidden'}`}>
          <div className='bg-white rounded-full w-[250px] h-[250px] shadow-xl flex items-center justify-center'>
            <img src={`${process.env.PUBLIC_URL}/images/thirdStep.png`} alt='Foodonate' className='w-[160px]' />
          </div>
          <p className='text-center text-white mt-7'>Terima paket donasi</p>
        </div>
      </div>
      <div onClick={() => handleChangePos('right')} className='bg-white text-orange-500 rounded-full w-fit p-2 absolute top-[50%] right-3 cursor-pointer block md:hidden'>
        <AiOutlineRight />
      </div>
    </div>
  )
}

export default Banner