import { AiOutlineClose } from 'react-icons/ai'

const EventRegistrationModal = ({ openModal, setOpenModal, modalRef, pendaftar }) => {
  return (
    <div className={`fixed top-0 left-0 right-0 bottom-0 ${openModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} transition-[opacity] flex items-center justify-center p-4 bg-[rgba(0,0,0,.7)]`}>
      <div ref={modalRef} className={`bg-white w-full ${openModal ? 'translate-y-0' : '-translate-y-12'} transition-[transform] max-w-[450px] rounded-md`}>
        <div className='border-b border-gray-300 px-5 py-4 flex items-center justify-between'>
          <h1>Pendaftar</h1>
          <AiOutlineClose onClick={() => setOpenModal(false)} className='cursor-pointer' />
        </div>
        <div className='p-5 h-[400px] overflow-auto hide-scrollbar'>
          {
            pendaftar?.length === 0
            ? (
              <div className='bg-red-500 text-white rounded-md text-sm p-3 text-center'>No Data Found</div>
            )
            : (
              <>
                {
                  pendaftar?.map(item => (
                    <div className='flex items-center justify-between'>
                      <div className='flex gap-3 items-center flex-1'>
                        <div className='bg-gray-300 w-10 h-10 rounded-full'>
                          <img src={item.user?.avatar} alt={item.user?.nama} className='w-full h-full rounded-full object-cover' />
                        </div>
                        <p className='text-sm'>{item.user?.nama}</p>
                      </div>
                      <div className='text-sm'>{new Date(item.createdAt).toLocaleDateString()}</div>
                    </div>
                  ))
                }
              </>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default EventRegistrationModal