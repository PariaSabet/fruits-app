import { useEffect, useState } from 'react'
import './App.css'

interface Nutrition {
  calories: number
  fat: number
  sugar: number
  carbohydrates: number
  protein: number
}

interface Fruit {
  name: string
  id: number
  family: string
  order: string
  genus: string
  nutrition: Nutrition
}

type GroupingField = 'family' | 'order' | 'genus'

function App() {
  const [fruits, setFruits] = useState<Fruit[]>([])
  const [groupBy, setGroupBy] = useState<GroupingField>('family')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFruits = async () => {
      try {
        const response = await fetch(
          'https://wcz3qr33kmjvzotdqt65efniv40kokon.lambda-url.us-east-2.on.aws/'
        )
        const data = await response.json()
        setFruits(data)
      } catch (err) {
        setError('Failed to fetch fruits data')
      } finally {
        setLoading(false)
      }
    }

    fetchFruits()
  }, [])

  const groupedFruits = fruits.reduce(
    (acc, fruit) => {
      const key = fruit[groupBy]
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(fruit)
      return acc
    },
    {} as Record<string, Fruit[]>
  )

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Fruits Catalog</h1>

      <div className="mb-4">
        <label className="mr-2">Group by:</label>
        <select
          value={groupBy}
          onChange={(e) => setGroupBy(e.target.value as GroupingField)}
          className="border p-1 rounded"
        >
          <option value="family">Family</option>
          <option value="order">Order</option>
          <option value="genus">Genus</option>
        </select>
      </div>

      <div className="grid gap-6">
        {Object.entries(groupedFruits).map(([group, groupFruits]) => (
          <div key={group} className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-3">{group}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupFruits.map((fruit) => (
                <div key={fruit.id} className="border rounded p-3">
                  <h3 className="font-medium">{fruit.name}</h3>
                  <div className="text-sm text-gray-600">
                    <p>Family: {fruit.family}</p>
                    <p>Order: {fruit.order}</p>
                    <p>Genus: {fruit.genus}</p>
                    <div className="mt-2">
                      <p>Calories: {fruit.nutrition.calories}</p>
                      <p>Sugar: {fruit.nutrition.sugar}g</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
