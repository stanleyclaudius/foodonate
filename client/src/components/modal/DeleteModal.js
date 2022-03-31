const DeleteModal = ({ 
  openDeleteModal,
  setOpenDeleteModal,
  deleteModalRef,
  onClick
}) => {
  return (
    <div className={`fixed top-0 left-0 right-0 bottom-0 ${openDeleteModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} transition-[opacity] flex items-center justify-center p-4 bg-[rgba(0,0,0,.7)]`}>
      <div ref={deleteModalRef} className={`bg-white w-full ${openDeleteModal ? 'translate-y-0' : '-translate-y-12'} transition-[transform] max-w-[600px] rounded-md text-center p-5`}>
        <div>
          <img src={`${process.env.PUBLIC_URL}/images/delete.svg`} alt='Foodonate' width={300} className='m-auto' />
        </div>
        <h1 className='text-lg my-6'>Apakah anda yakin ingin menghapus?</h1>
        <div className='flex items-center justify-center gap-16'>
          <button onClick={onClick} className='bg-red-500 hover:bg-red-600 transition-[background] rounded-md px-4 py-2 text-white'>Hapus</button>
          <button onClick={() => setOpenDeleteModal(false)}>Batal</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal