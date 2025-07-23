import { useQuery, useQueries } from '@tanstack/react-query'
import { apiService } from '../services/api'

export const useBodyParts = () => {
  return useQuery({
    queryKey: ['bodyParts'],
    queryFn: () => apiService.getBodyParts(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    retry: 2
  })
}

export const useEquipmentTypes = () => {
  return useQuery({
    queryKey: ['equipment'],
    queryFn: () => apiService.getEquipmentTypes(),
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    retry: 2
  })
}

export const useExerciseData = () => {
  return useQueries({
    queries: [
      {
        queryKey: ['bodyParts'],
        queryFn: () => apiService.getBodyParts(),
        staleTime: 5 * 60 * 1000
      },
      {
        queryKey: ['equipment'],
        queryFn: () => apiService.getEquipmentTypes(),
        staleTime: 5 * 60 * 1000
      }
    ]
  })
}

export const useExercises = (bodyPart = null, limit = 20) => {
  return useQuery({
    queryKey: ['exercises', bodyPart, limit],
    queryFn: () =>
      bodyPart
        ? apiService.getExercisesByBodyPart(bodyPart)
        : apiService.getExercises(limit),
    enabled: !!bodyPart || limit > 0, // Only run if we have parameters
    staleTime: 2 * 60 * 1000 // 2 minutes for exercise data
  })
}
