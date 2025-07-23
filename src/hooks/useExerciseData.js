import { useState, useEffect, useCallback } from 'react'
import { apiService } from '../services/api'

// Simple cache implementation
const cache = new Map()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export const useExerciseData = () => {
  const [bodyParts, setBodyParts] = useState([])
  const [equipment, setEquipment] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const getCachedData = (key) => {
    const cached = cache.get(key)
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data
    }
    return null
  }

  const setCachedData = (key, data) => {
    cache.set(key, { data, timestamp: Date.now() })
  }

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // Check cache first
      const cachedBodyParts = getCachedData('bodyParts')
      const cachedEquipment = getCachedData('equipment')

      if (cachedBodyParts && cachedEquipment) {
        setBodyParts(cachedBodyParts)
        setEquipment(cachedEquipment)
        setLoading(false)
        return
      }

      // Fetch from API
      const [bodyPartsData, equipmentData] = await Promise.all([
        apiService.getBodyParts(),
        apiService.getEquipmentTypes()
      ])

      // Cache the results
      setCachedData('bodyParts', bodyPartsData)
      setCachedData('equipment', equipmentData)

      setBodyParts(bodyPartsData)
      setEquipment(equipmentData)
    } catch (err) {
      setError(err.message)
      // Fallback data
      setBodyParts(['back', 'chest', 'arms', 'legs', 'shoulders', 'waist'])
      setEquipment(['body weight', 'dumbbell', 'barbell', 'cable', 'machine'])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Return refetch function for manual refresh
  return { bodyParts, equipment, loading, error, refetch: fetchData }
}
