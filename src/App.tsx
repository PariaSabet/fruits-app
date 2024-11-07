import { useState } from 'react'
import './App.css'
import { GroupingField, Fruit, ViewType } from './types/fruit'
import { useFruitData } from './hooks/useFruitData'
import { useGroupedFruits } from './hooks/useGroupedFruits'
import { GroupBySelector } from './components/GroupBySelector'
import { ViewSelector } from './components/ViewSelector'
import { FruitList } from './components/FruitList'
import { FruitJar } from './components/FruitJar'

interface FruitInstance extends Fruit {
  instanceId: string
}

function App() {
  const [groupBy, setGroupBy] = useState<GroupingField>('none')
  const [view, setView] = useState<ViewType>('list')
  const [selectedFruits, setSelectedFruits] = useState<FruitInstance[]>([])
  const { fruits, loading, error } = useFruitData()
  const groupedFruits = useGroupedFruits(fruits, groupBy)

  const handleAddFruit = (fruit: Fruit) => {
    const instanceId = `${fruit.id}-${Date.now()}`
    setSelectedFruits((prev) => [...prev, { ...fruit, instanceId }])
  }

  const handleRemoveFruit = (instanceId: string) => {
    setSelectedFruits((prev) => prev.filter((f) => f.instanceId !== instanceId))
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Fruits Catalog</h1>

      <div className="flex gap-6">
        <div className="w-2/3">
          <div className="flex justify-between items-center mb-4">
            <GroupBySelector groupBy={groupBy} setGroupBy={setGroupBy} />
            <ViewSelector view={view} setView={setView} />
          </div>
          <FruitList
            groupedFruits={groupedFruits}
            selectedFruits={selectedFruits}
            onAddFruit={handleAddFruit}
            view={view}
          />
        </div>

        <div className="w-1/3">
          <FruitJar
            selectedFruits={selectedFruits}
            onRemoveFruit={handleRemoveFruit}
          />
        </div>
      </div>
    </div>
  )
}

export default App
