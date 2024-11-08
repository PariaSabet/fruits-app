import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js'
import { Fruit } from '../types/fruit'
import { colors } from '../utils/colors'
import { motion } from 'framer-motion'

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title)

interface FruitCaloriesChartProps {
  fruits: Fruit[]
  totalCalories: number
}

export function FruitCaloriesChart({
  fruits,
  totalCalories,
}: FruitCaloriesChartProps) {
  // Aggregate calories by fruit name
  const aggregatedData = fruits.reduce(
    (acc, fruit) => {
      const existingFruit = acc.find((item) => item.name === fruit.name)
      if (existingFruit) {
        existingFruit.calories += fruit.nutritions.calories
        existingFruit.count += 1
        existingFruit.segments.push(fruit.nutritions.calories)
      } else {
        acc.push({
          name: fruit.name,
          calories: fruit.nutritions.calories,
          count: 1,
          segments: [fruit.nutritions.calories],
        })
      }
      return acc
    },
    [] as Array<{
      name: string
      calories: number
      count: number
      segments: number[]
    }>
  )

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          generateLabels: (chart: any) => {
            const datasets = chart.data.datasets[0]
            return chart.data.labels.map((label: string, index: number) => ({
              text: `${label} (${aggregatedData[index].count})`,
              fillStyle: datasets.backgroundColor[index],
              strokeStyle: 'white',
              hidden: false,
              index: index,
            }))
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.raw
            const percentage = ((value / totalCalories) * 100).toFixed(1)
            const fruit = aggregatedData[context.dataIndex]
            return ` ${fruit.name} (×${fruit.count}): ${value} cal (${percentage}%)`
          },
        },
      },
    },
  }

  const data = {
    labels: aggregatedData.map((item) => item.name),
    datasets: [
      {
        data: aggregatedData.map((item) => item.calories),
        backgroundColor: aggregatedData.map(
          (_, index) => colors.chart[index % colors.chart.length]
        ),
        borderColor: 'white',
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6 bg-white rounded-2xl shadow-soft">
        <Pie options={options} data={data} />
      </div>
    </motion.div>
  )
}
