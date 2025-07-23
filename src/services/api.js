const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error)
      throw error
    }
  }

  // Exercise endpoints
  async getExercises(limit = 20) {
    return this.request(`/exercises?limit=${limit}`)
  }

  async getExerciseById(id) {
    return this.request(`/exercises/${id}`)
  }

  async getExercisesByBodyPart(bodyPart) {
    return this.request(`/exercises/bodyPart/${bodyPart}`)
  }

  async getBodyParts() {
    return this.request('/exercises/bodyParts')
  }

  async getEquipmentTypes() {
    return this.request('/exercises/equipment')
  }

  // Add more endpoints as needed
  async searchExercises(query) {
    return this.request(`/exercises/search?q=${encodeURIComponent(query)}`)
  }
}

export const apiService = new ApiService()
