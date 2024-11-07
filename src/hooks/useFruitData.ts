import { useState, useEffect } from 'react'
import { Fruit } from '../types/fruit'
import { FruitService } from '../services/api'

export function useFruitData() {
  const [fruits, setFruits] = useState<Fruit[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFruits = async () => {
      try {
        const data = await FruitService.getFruits()
        setFruits(data)
      } catch (err) {
        console.error(err)
        setError('Failed to fetch fruits data')
      } finally {
        setLoading(false)
      }
    }

    fetchFruits()
  }, [])

  return { fruits, loading, error }
}
