import { Fruit } from '../types/fruit'
import { useState } from 'react'
import { FruitCaloriesChart } from './FruitCaloriesChart'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartPie, faTrash } from '@fortawesome/free-solid-svg-icons'
import { motion, AnimatePresence } from 'framer-motion'

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
              className="
                px-2 py-2 
                bg-gradient-to-r from-blue-500 to-indigo-500 
                text-white rounded-lg 
                hover:from-blue-600 hover:to-indigo-600
                shadow-sm hover:shadow-md
                transform hover:-translate-y-0.5
                transition-all duration-200
                flex items-center space-x-2
                font-medium
                text-sm
              "
            >
              <FontAwesomeIcon
                icon={faChartPie}
                className={`h-4 w-4 ${showChart ? 'rotate-180' : ''} transition-transform`}
              />
              <span>{showChart ? 'Hide Chart' : 'Show Chart'}</span>
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
        <AnimatePresence>
          {selectedFruits.map((fruit) => (
            <motion.div
              key={fruit.instanceId}
              initial={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.2 }}
              className="flex justify-between items-center p-2 bg-gray-50 rounded"
            >
              <span>
                {fruit.name} ({fruit.nutritions.calories} calories)
              </span>
              <button
                onClick={() => onRemoveFruit(fruit.instanceId)}
                className="
                  p-2 
                  text-red-200 hover:text-red-500
                  rounded-full
                  hover:bg-red-50
                  transition-colors
                "
                aria-label="Remove fruit"
              >
                <FontAwesomeIcon icon={faTrash} className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
        <AnimatePresence>
          {selectedFruits.length === 0 && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-gray-500"
            >
              No fruits in the jar
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
