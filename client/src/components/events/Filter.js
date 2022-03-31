import { useState, useRef, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { HiOutlineChevronDown, HiSortDescending } from 'react-icons/hi'
import { IoRefreshOutline, IoTodayOutline } from 'react-icons/io5'
import { MdFilterAlt } from 'react-icons/md'
import { AiOutlineClose } from 'react-icons/ai'

const Filter = ({ handleFilter }) => {
  const [openFilter, setOpenFilter] = useState(false)
  const [kategoriList, setKategoriList] = useState([])
  const [lokasiList, setLokasiList] = useState([])

  const [selectedKategori, setSelectedKategori] = useState([])
  const [selectedLokasi, setSelectedLokasi] = useState([])
  const [urutkan, setUrutkan] = useState('')

  const filterRef = useRef()

  const { event } = useSelector(state => state)

  const handleResetFilter = () => {
    setSelectedKategori([])
    setSelectedLokasi([])
    setUrutkan('')
    handleFilter([], [], 'terbaru')
  }

  const handleChangeKategori = e => {
    if (!selectedKategori.includes(e.target.value)) {
      setSelectedKategori([...selectedKategori, e.target.value])
    } else {
      const newKategori = selectedKategori.filter(item => item !== e.target.value)
      setSelectedKategori(newKategori)
    }
  }

  const handleChangeLokasi = e => {
    if (!selectedLokasi.includes(e.target.value)) {
      setSelectedLokasi([...selectedLokasi, e.target.value])
    } else {
      const newLokasi = selectedLokasi.filter(item => item !== e.target.value)
      setSelectedLokasi(newLokasi)
    }
  }
  
  const getKategoriAndLokasi = useCallback(() => {
    const lokasiTemp = []
    const kategoriTemp = []

    event.data.forEach(item => {
      if (!lokasiTemp.includes(item.lokasi)) {
        lokasiTemp.push(item.lokasi)
      }

      if (!kategoriTemp.includes(item.kategori)) {
        kategoriTemp.push(item.kategori)
      }
    })

    setLokasiList(lokasiTemp)
    setKategoriList(kategoriTemp)
  }, [event.data])

  useEffect(() => {
    const checkIfClickedOutside = e => {
      if (openFilter && filterRef.current && !filterRef.current.contains(e.target)) {
        setOpenFilter(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openFilter])

  useEffect(() => {
    getKategoriAndLokasi()
  }, [getKategoriAndLokasi])

  return (
    <>
      <div onClick={() => setOpenFilter(true)} className='flex items-center w-fit bg-orange-400 text-white rounded-md mb-6 shadow-xl px-3 py-2 md:hidden'>
        <MdFilterAlt />
        Filter
      </div>
      <div ref={filterRef} className={`flex-1 pb-10 bg-orange-400 text-white md:static fixed top-0 ${openFilter ? 'left-0 z-[999]' : '-left-[350px] -z-[999]'} md:z-[9] transition-all shadow-xl bottom-0`}>
        <AiOutlineClose onClick={() => setOpenFilter(false)} className='md:hidden block text-white my-6 float-right mr-5 text-xl cursor-pointer' />
        <div className='clear-both' />
        <div className='border-b border-white p-4 flex items-center gap-3'>
          <MdFilterAlt className='text-white text-xl -translate-y-[1px]' />
          <h1 className='text-xl'>Filter</h1>
        </div>
        <div className='p-4 border-b border-white'>
          <div className='flex items-center gap-3'>
            <HiOutlineChevronDown />
            <p>Kategori</p>
          </div>
          <div className='px-7'>
            {
              kategoriList.map((item, idx) => (
                <div key={idx} className='flex items-center gap-3 mt-3'>
                  <input type='checkbox' checked={selectedKategori.includes(item) ? true : false} id={item} onChange={handleChangeKategori} value={item} />
                  <label htmlFor={item} className='capitalize'>{item}</label>
                </div>
              ))
            }
          </div>
        </div>
        <div className='p-4 border-b border-white'>
          <div className='flex items-center gap-3'>
            <HiOutlineChevronDown />
            <p>Lokasi</p>
          </div>
          <div className='px-7'>
            {
              lokasiList.map((item, idx) => (
                <div key={idx} className='flex items-center gap-3 mt-3'>
                  <input type='checkbox' id={item} checked={selectedLokasi.includes(item) ? true : false} onChange={handleChangeLokasi} value={item} />
                  <label htmlFor={item} className='capitalize'>{item}</label>
                </div>
              ))
            }
          </div>
        </div>
        <div className='p-4'>
          <div className='flex items-center gap-3'>
            <HiOutlineChevronDown />
            <p>Urutkan</p>
          </div>
          <div className='px-7'>
            <div onClick={() => setUrutkan('terbaru')} className='flex items-center gap-3 mt-3 cursor-pointer w-fit'>
              <HiSortDescending />
              <label htmlFor='terbaru' className={`${urutkan === 'terbaru' ? 'underline' : undefined} cursor-pointer`}>Terbaru</label>
            </div>
            <div onClick={() => setUrutkan('hariIni')} className='flex items-center gap-3 mt-3 cursor-pointer w-fit'>
              <IoTodayOutline />
              <label htmlFor='hariIni' className={`${urutkan === 'hariIni' ? 'underline' : undefined} cursor-pointer`}>Hari Ini</label>
            </div>
          </div>
        </div>
        <div className='flex items-center gap-7 px-10 mt-4'>
          <button onClick={() => handleFilter(selectedKategori, selectedLokasi, urutkan)} className='px-4 py-2 bg-white text-orange-500 rounded-md shadow-xl text-sm'>Apply Filter</button>
          <IoRefreshOutline onClick={handleResetFilter} className='text-2xl cursor-pointer' />
        </div>
      </div>
    </>
  )
}

export default Filter