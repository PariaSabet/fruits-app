import { Fruit } from '../types/fruit'
import { useState } from 'react'
import { FruitCaloriesChart } from './FruitCaloriesChart'

interface FruitInstance extends Fruit {
  instanceId: string
}

interface FruitJarProps {
  selectedFruits: FruitInstance[]
  onRemoveFruit: (instanceId: string) => void
}

export function FruitJar({ selectedFruits, onRemoveFruit }: FruitJarProps) {
  const [showChart, setShowChart] = useState(false)

  const totalCalories = selectedFruits.reduce(
    (sum, fruit) => sum + fruit.nutritions.calories,
    0
  )

  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Fruit Jar</h2>
        <div className="flex items-center gap-4">
          <div className="text-gray-600">
            Total Calories: <span className="font-medium">{totalCalories}</span>
          </div>
          {selectedFruits.length > 0 && (
            <button
              onClick={() => setShowChart(!showChart)}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {showChart ? 'Hide Chart' : 'Show Chart'}
            </button>
          )}
        </div>
      </div>

      {showChart && selectedFruits.length > 0 && (
        <div className="mb-4">
          <FruitCaloriesChart
            fruits={selectedFruits}
            totalCalories={totalCalories}
          />
        </div>
      )}

      <div className="space-y-2">
        {selectedFruits.map((fruit) => (
          <div
            key={fruit.instanceId}
            className="flex justify-between items-center p-2 bg-gray-50 rounded"
          >
            <span>
              {fruit.name} ({fruit.nutritions.calories} calories)
            </span>
            <button
              onClick={() => onRemoveFruit(fruit.instanceId)}
              className="px-2 py-1 text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}
        {selectedFruits.length === 0 && (
          <p className="text-gray-500">No fruits in the jar</p>
        )}
      </div>
    </div>
  )
}
