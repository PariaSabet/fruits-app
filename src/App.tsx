import { useState } from 'react'
import './App.css'
import { GroupingField, Fruit, ViewType } from './types/fruit'
import { useFruitData } from './hooks/useFruitData'
import { useGroupedFruits } from './hooks/useGroupedFruits'
import { GroupBySelector } from './components/GroupBySelector'
import { ViewSelector } from './components/ViewSelector'
import { FruitList } from './components/FruitList'
import { FruitJar } from './components/FruitJar'
import { LoadingOverlay } from './components/LoadingOverlay'
import { AnimatePresence } from 'framer-motion'

interface FruitInstance extends Fruit {
  instanceId: string
}

function App() {
  const [groupBy, setGroupBy] = useState<GroupingField>('none')
  const [view, setView] = useState<ViewType>('list')
  const [selectedFruits, setSelectedFruits] = useState<FruitInstance[]>([])
  const { fruits, loading } = useFruitData()
  const groupedFruits = useGroupedFruits(fruits, groupBy)

  const handleAddFruit = (fruit: Fruit) => {
    const instanceId = `${fruit.id}-${Date.now()}`
    setSelectedFruits((prev) => [...prev, { ...fruit, instanceId }])
  }

  const handleRemoveFruit = (instanceId: string) => {
    setSelectedFruits((prev) => prev.filter((f) => f.instanceId !== instanceId))
  }

  return (
    <>
      <AnimatePresence>{loading && <LoadingOverlay />}</AnimatePresence>

      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Fruits</h1>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-2/3">
            {/* Tab header */}
            <div className="border-b border-gray-200 pb-1">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <GroupBySelector groupBy={groupBy} setGroupBy={setGroupBy} />
                </div>
                <div className="flex-1 flex justify-end">
                  <ViewSelector view={view} setView={setView} />
                </div>
              </div>
            </div>

            {/* Tab content */}
            <div className="mt-4">
              <FruitList
                groupedFruits={groupedFruits}
                selectedFruits={selectedFruits}
                onAddFruit={handleAddFruit}
                view={view}
              />
            </div>
          </div>

          <div className="w-full md:w-1/3">
            <FruitJar
              selectedFruits={selectedFruits}
              onRemoveFruit={handleRemoveFruit}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
