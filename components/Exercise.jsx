export const Exercise = ({ title, description }) => {
  return (
    <div className='flex flex-col items-center mb-5'>
      <img
        src={`https://via.placeholder.com/300?text=${title}`}
        alt={title}
        className='w-full max-w-xs h-auto mb-2.5'
      />
      <h2 className='text-2xl mb-2.5'>{title}</h2>
      <p className='text-base text-gray-600 mb-2.5'>{description}</p>
    </div>
  )
}
