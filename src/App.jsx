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
    return <div>Loading exercise data...</div>
  }

  if (hasError) {
    return <div>Error loading data. Please try again later.</div>
  }

  return (
    <div>
      {/* Select number of days / week */}
      <Dropdown
        placeholder='Select days/week'
        options={['1', '2', '3', '4', '5', '6', '7']}
        selectedValue={selectedDays} // Use state here
        onSelect={setSelectedDays} // Update state on select
      />
      {/* For body parts */}
      <Dropdown
        placeholder='Select body part'
        options={bodyParts}
        selectedValue={selectedBodyPart}
        onSelect={setSelectedBodyPart}
        searchable
      />
      {/* For equipment */}
      <Dropdown
        placeholder='Select equipment'
        options={equipment}
        selectedValue={selectedEquipment}
        onSelect={setSelectedEquipment}
      />
      <h1>Welcome to the Gym App</h1>
      <p>Your fitness journey starts here!</p>
      {/* Optional: Display selected values for testing */}
      {selectedBodyPart && <p>Selected body part: {selectedBodyPart}</p>}
      {selectedEquipment && <p>Selected equipment: {selectedEquipment}</p>}
      {selectedDays && <p>Selected days/week: {selectedDays}</p>}{' '}
      {/* Display selected days */}
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
