import { Fruit, ViewType } from '../types/fruit'
import { useState } from 'react'
import { motion } from 'framer-motion'

interface FruitListProps {
  groupedFruits: Record<string, Fruit[]>
  selectedFruits: Fruit[]
  onAddFruit: (fruit: Fruit) => void
  view: ViewType
}

export function FruitList({ groupedFruits, onAddFruit, view }: FruitListProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set())

  const toggleGroup = (group: string) => {
    const newExpanded = new Set(expandedGroups)
    if (expandedGroups.has(group)) {
      newExpanded.delete(group)
    } else {
      newExpanded.add(group)
    }
    setExpandedGroups(newExpanded)
  }

  const handleAddGroup = (fruits: Fruit[], e: React.MouseEvent) => {
    e.stopPropagation() // Prevent group toggle when clicking Add Group
    fruits.forEach((fruit) => onAddFruit(fruit))
  }

  const renderListView = (fruits: Fruit[]) => (
    <div className="space-y-2">
      {fruits.map((fruit) => (
        <motion.div
          key={fruit.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="px-4 py-2 hover:bg-fruit-pink-50 transition-colors duration-200 
                   flex justify-between items-center rounded-xl bg-white"
        >
          <span className="font-medium">
            {fruit.name}
            <span className="text-fruit-purple-500 text-sm ml-2">
              ({fruit.nutritions.calories} calories)
            </span>
          </span>
          <button
            onClick={() => onAddFruit(fruit)}
            className="px-4 py-2 bg-fruit-mint-500 text-white text-xs rounded-lg hover:bg-fruit-mint-600 
                     transition-colors duration-200 shadow-soft"
          >
            Add
          </button>
        </motion.div>
      ))}
    </div>
  )

  const renderTableView = (fruits: Fruit[]) => (
    <div className="overflow-x-auto rounded-xl shadow-soft bg-white">
      <table className="w-full">
        <thead>
          <tr className="bg-fruit-purple-50">
            <th className="p-4 text-left font-medium text-fruit-purple-500">
              Name
            </th>
            <th className="p-4 text-left font-medium text-fruit-purple-500">
              Family
            </th>
            <th className="p-4 text-left font-medium text-fruit-purple-500">
              Order
            </th>
            <th className="p-4 text-left font-medium text-fruit-purple-500">
              Genus
            </th>
            <th className="p-4 text-left font-medium text-fruit-purple-500">
              Calories
            </th>
            <th className="p-4 text-left font-medium text-fruit-purple-500">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {fruits.map((fruit) => (
            <motion.tr
              key={fruit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="hover:bg-fruit-pink-50 transition-colors duration-200"
            >
              <td className="p-4 border-t border-fruit-purple-100">
                {fruit.name}
              </td>
              <td className="p-4 border-t border-fruit-purple-100">
                {fruit.family}
              </td>
              <td className="p-4 border-t border-fruit-purple-100">
                {fruit.order}
              </td>
              <td className="p-4 border-t border-fruit-purple-100">
                {fruit.genus}
              </td>
              <td className="p-4 border-t border-fruit-purple-100">
                {fruit.nutritions.calories}
              </td>
              <td className="p-4 border-t border-fruit-purple-100">
                <button
                  onClick={() => onAddFruit(fruit)}
                  className="px-4 py-2 bg-fruit-mint-500 text-white text-xs rounded-lg hover:bg-fruit-mint-600 
                           transition-colors duration-200 shadow-soft"
                >
                  Add
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <div className="space-y-6">
      {Object.entries(groupedFruits).map(([group, fruits]) => (
        <div
          key={group}
          className="border border-fruit-purple-100 rounded-2xl overflow-hidden shadow-soft bg-white"
        >
          {group !== 'none' ? (
            <div className="flex items-center justify-between bg-fruit-purple-50 border-b border-fruit-purple-100">
              <button
                className="flex-grow p-4 text-left font-medium flex justify-between items-center text-fruit-purple-500"
                onClick={() => toggleGroup(group)}
              >
                <span className="text-lg">{group}</span>
                <span className="text-fruit-purple-500 text-xl">
                  {expandedGroups.has(group) ? '−' : '+'}
                </span>
              </button>
              <button
                onClick={(e) => handleAddGroup(fruits, e)}
                className="px-3 py-2 mr-4 bg-fruit-peach-500 text-white text-sm rounded-lg hover:bg-fruit-peach-600 
                         transition-colors duration-200 shadow-soft"
              >
                Add Group
              </button>
            </div>
          ) : null}

          <div
            className={`p-4 ${
              group !== 'none' && !expandedGroups.has(group) ? 'hidden' : ''
            }`}
          >
            {view === 'list' ? renderListView(fruits) : renderTableView(fruits)}
          </div>
        </div>
      ))}
    </div>
  )
}
