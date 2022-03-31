import { Link } from 'react-router-dom'

const Banner = () => {
  return (
    <div className='bg-orange-400 p-20 flex flex-col md:flex-row flex-col-reverse items-center justify-between'>
      <div>
        <h1 data-aos='fade-right' className='md:text-2xl text-md mt-8 md:mt-0 text-white mb-8 leading-10 font-medium'>Platform berbagi makanan gratis di seluruh Indonesia. <br /> Mari ikut berpartisipasi untuk mengisi perut <br /> sesama bersama Foodonate.</h1>
        <div data-aos='fade-right' data-aos-delay='100'>
          <Link to='/events' className='bg-white shadow-xl text-orange-500 rounded-md text-sm px-4 py-3'>Cari Donasi</Link>
        </div>
      </div>
      <div data-aos='fade-left'>
        <img src={`${process.env.PUBLIC_URL}/images/banner.png`} alt='Foodonate' className='w-[500px]' />
      </div>
    </div>
  )
}

export default Banner