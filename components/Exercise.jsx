import styled from 'styled-components'

const ExerciseContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`

const ExerciseImage = styled.img`
  width: 100%;
  max-width: 300px;
  height: auto;
  margin-bottom: 10px;
`

const ExerciseTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`

const ExerciseDescription = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 10px;
`

export const Exercise = ({ title, description }) => {
  return (
    <ExerciseContainer>
      <ExerciseImage
        src={`https://via.placeholder.com/300?text=${title}`}
        alt={title}
      />
      <ExerciseTitle>{title}</ExerciseTitle>
      <ExerciseDescription>{description}</ExerciseDescription>
    </ExerciseContainer>
  )
}
