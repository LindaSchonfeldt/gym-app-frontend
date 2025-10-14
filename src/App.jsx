import { useState } from 'react'
import { Dropdown } from '../components/Dropdown'
import { useBodyParts, useEquipmentTypes } from './hooks/useExerciseQueries'
import { ExerciseProvider } from './context/ExerciseContext'

const AppContent = () => {
  const [selectedBodyPart, setSelectedBodyPart] = useState(null)
  const [selectedEquipment, setSelectedEquipment] = useState(null)
  const [selectedDays, setSelectedDays] = useState(null)

  // Using React Query hooks
  const {
    data: bodyParts = [],
    isLoading: bodyPartsLoading,
    error: bodyPartsError
  } = useBodyParts()

  const {
    data: equipment = [],
    isLoading: equipmentLoading,
    error: equipmentError
  } = useEquipmentTypes()

  const isLoading = bodyPartsLoading || equipmentLoading
  const hasError = bodyPartsError || equipmentError

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen text-lg'>
        Loading exercise data...
      </div>
    )
  }

  if (hasError) {
    return (
      <div className='flex items-center justify-center min-h-screen text-lg text-red-600'>
        Error loading data. Please try again later.
      </div>
    )
  }

  return (
    <div className='container mx-auto p-6 max-w-4xl'>
      <h1 className='text-4xl font-bold text-center mb-8 text-gray-800'>
        Welcome to the Gym App
      </h1>
      <p className='text-xl text-center mb-8 text-gray-600'>
        Your fitness journey starts here!
      </p>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
        {/* Select number of days / week */}
        <div className='space-y-2'>
          <label className='block text-sm font-medium text-gray-700'>
            Days per week
          </label>
          <Dropdown
            placeholder='Select days/week'
            options={['1', '2', '3', '4', '5', '6', '7']}
            selectedValue={selectedDays}
            onSelect={setSelectedDays}
            width='w-full'
          />
        </div>

        {/* For body parts */}
        <div className='space-y-2'>
          <label className='block text-sm font-medium text-gray-700'>
            Body part
          </label>
          <Dropdown
            placeholder='Select body part'
            options={bodyParts}
            selectedValue={selectedBodyPart}
            onSelect={setSelectedBodyPart}
            searchable
            width='w-full'
          />
        </div>

        {/* For equipment */}
        <div className='space-y-2'>
          <label className='block text-sm font-medium text-gray-700'>
            Equipment
          </label>
          <Dropdown
            placeholder='Select equipment'
            options={equipment}
            selectedValue={selectedEquipment}
            onSelect={setSelectedEquipment}
            width='w-full'
          />
        </div>
      </div>

      {/* Display selected values */}
      {(selectedBodyPart || selectedEquipment || selectedDays) && (
        <div className='bg-gray-50 p-4 rounded-lg'>
          <h3 className='text-lg font-medium mb-2 text-gray-800'>
            Your Selection:
          </h3>
          {selectedDays && (
            <p className='text-gray-600'>
              Days per week: <span className='font-medium'>{selectedDays}</span>
            </p>
          )}
          {selectedBodyPart && (
            <p className='text-gray-600'>
              Body part: <span className='font-medium'>{selectedBodyPart}</span>
            </p>
          )}
          {selectedEquipment && (
            <p className='text-gray-600'>
              Equipment:{' '}
              <span className='font-medium'>{selectedEquipment}</span>
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export const App = () => {
  return (
    <ExerciseProvider>
      <AppContent />
    </ExerciseProvider>
  )
}
