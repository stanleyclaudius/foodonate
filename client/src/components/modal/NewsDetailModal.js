import { AiOutlineClose } from 'react-icons/ai'

const NewsDetailModal = ({
  openNewsDetailModal,
  setOpenNewsDetailModal,
  newsDetailModalRef,
  selectedItem
}) => {
  return (
    <div className={`fixed top-0 left-0 right-0 bottom-0 ${openNewsDetailModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} transition-[opacity] z-[999] flex items-center justify-center p-4 bg-[rgba(0,0,0,.7)]`}>
      <div ref={newsDetailModalRef} className={`bg-white w-full ${openNewsDetailModal ? 'translate-y-0' : '-translate-y-12'} transition-[transform] max-w-[500px] rounded-md`}>
        <div className='border-b border-gray-300 px-5 py-4 flex items-center justify-between'>
          <h1>{selectedItem?.judul}</h1>
          <AiOutlineClose onClick={() => setOpenNewsDetailModal(false)} className='cursor-pointer' />
        </div>
        <div className='p-5'>
          <div className='w-full h-[200px] rounded-md bg-gray-200'>
            <img src={selectedItem?.gambar} alt={selectedItem?.judul} className='w-full h-full rounded-md object-cover' />
          </div>
          <div className='h-56 overflow-auto hide-scrollbar mt-4 text-sm text-justify leading-loose'>
            <p>
              {selectedItem?.isi}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsDetailModal