import { Fruit } from '../types/fruit'

interface FruitCardProps {
  fruit: Fruit
  isSelected: boolean
  onSelect: (fruit: Fruit) => void
}

export function FruitCard({ fruit, isSelected, onSelect }: FruitCardProps) {
  return (
    <div
      className={`border rounded p-3 cursor-pointer transition-colors ${
        isSelected ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
      }`}
      onClick={() => onSelect(fruit)}
    >
      <h3 className="font-medium">{fruit.name}</h3>
      <div className="text-sm text-gray-600">
        <p>Family: {fruit.family}</p>
        <p>Order: {fruit.order}</p>
        <p>Genus: {fruit.genus}</p>
        <div className="mt-2">
          <p>Calories: {fruit.nutritions.calories}</p>
          <p>Sugar: {fruit.nutritions.sugar}g</p>
        </div>
      </div>
    </div>
  )
}
