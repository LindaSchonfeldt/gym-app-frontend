import styled from 'styled-components'
import { Exercise } from './Exercise'

const DayContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`
const DayTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`
export const Day = ({ day, exercises }) => {
  return (
    <DayContainer>
      <DayTitle>Day {day}</DayTitle>
      {exercises.map((exercise, index) => (
        <Exercise key={index} {...exercise} />
      ))}
    </DayContainer>
  )
}
