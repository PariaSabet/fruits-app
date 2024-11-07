import { Fruit, GroupingField, ViewType } from '../types/fruit'
import { useState } from 'react'

interface FruitListProps {
  groupedFruits: Record<string, Fruit[]>
  selectedFruits: Fruit[]
  onAddFruit: (fruit: Fruit) => void
  view: ViewType
}

export function FruitList({
  groupedFruits,
  selectedFruits,
  onAddFruit,
  view,
}: FruitListProps) {
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
    <div>
      {fruits.map((fruit) => (
        <div
          key={fruit.id}
          className="p-3 hover:bg-gray-50 flex justify-between items-center"
        >
          <span>
            {fruit.name} ({fruit.nutritions.calories} calories)
          </span>
          <button
            onClick={() => onAddFruit(fruit)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      ))}
    </div>
  )

  const renderTableView = (fruits: Fruit[]) => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Family</th>
            <th className="p-3 text-left">Order</th>
            <th className="p-3 text-left">Genus</th>
            <th className="p-3 text-left">Calories</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {fruits.map((fruit) => (
            <tr key={fruit.id} className="hover:bg-gray-50">
              <td className="p-3 border-t">{fruit.name}</td>
              <td className="p-3 border-t">{fruit.family}</td>
              <td className="p-3 border-t">{fruit.order}</td>
              <td className="p-3 border-t">{fruit.genus}</td>
              <td className="p-3 border-t">{fruit.nutritions.calories}</td>
              <td className="p-3 border-t">
                <button
                  onClick={() => onAddFruit(fruit)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <div className="space-y-4">
      {Object.entries(groupedFruits).map(([group, fruits]) => (
        <div key={group} className="border rounded-lg overflow-hidden">
          {group !== 'none' ? (
            <div className="flex items-center justify-between bg-gray-100">
              <button
                className="flex-grow p-3 text-left font-medium flex justify-between items-center"
                onClick={() => toggleGroup(group)}
              >
                <span>{group}</span>
                <span>{expandedGroups.has(group) ? '−' : '+'}</span>
              </button>
              <button
                onClick={(e) => handleAddGroup(fruits, e)}
                className="px-4 py-2 mr-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add Group
              </button>
            </div>
          ) : null}

          <div
            className={
              group !== 'none' && !expandedGroups.has(group) ? 'hidden' : ''
            }
          >
            {view === 'list' ? renderListView(fruits) : renderTableView(fruits)}
          </div>
        </div>
      ))}
    </div>
  )
}
