import { Fruit } from '../types/fruit'

const API_URL = 'https://fruitsappdemo.netlify.app/.netlify/functions/proxy'

export const FruitService = {
  async getFruits(): Promise<Fruit[]> {
    const response = await fetch(API_URL)
    if (!response.ok) {
      throw new Error('Failed to fetch fruits')
    }
    return response.json()
  },
}
