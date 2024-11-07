import { Fruit } from '../types/fruit'

const API_URL =
  'https://wcz3qr33kmjvzotdqt65efniv40kokon.lambda-url.us-east-2.on.aws/'

export const FruitService = {
  async getFruits(): Promise<Fruit[]> {
    const response = await fetch(API_URL)
    if (!response.ok) {
      throw new Error('Failed to fetch fruits')
    }
    return response.json()
  },
}
