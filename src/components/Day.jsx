import { Exercise } from '../../components/Exercise'

export const Day = ({ day, exercises }) => {
  return (
    <div className='flex flex-col items-center mb-5'>
      <h1 className='text-2xl mb-2.5'>Day {day}</h1>
      {exercises.map((exercise, index) => (
        <Exercise key={index} {...exercise} />
      ))}
    </div>
  )
}
