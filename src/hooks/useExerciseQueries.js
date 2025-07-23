import { useQuery, useQueries } from '@tanstack/react-query'

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'https://gym-app-api-34r7.onrender.com'

export const useBodyParts = () => {
  return useQuery({
    queryKey: ['bodyParts'],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/exercises/bodyParts`)
      return response.json()
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    retry: 2
  })
}

export const useEquipmentTypes = () => {
  return useQuery({
    queryKey: ['equipment'],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/exercises/equipment`)
      return response.json()
    },
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
        queryFn: async () => {
          const response = await fetch(`${API_BASE_URL}/exercises/bodyParts`)
          return response.json()
        },
        staleTime: 5 * 60 * 1000
      },
      {
        queryKey: ['equipment'],
        queryFn: async () => {
          const response = await fetch(`${API_BASE_URL}/exercises/equipment`)
          return response.json()
        },
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
        ? `${API_BASE_URL}.getExercisesByBodyPart(bodyPart)`
        : `${API_BASE_URL}.getExercises(limit)`,
    enabled: !!bodyPart || limit > 0, // Only run if we have parameters
    staleTime: 2 * 60 * 1000 // 2 minutes for exercise data
  })
}
