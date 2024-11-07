import { Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js'
import DataLabelsPlugin from 'chartjs-plugin-datalabels'
import { Fruit } from '../types/fruit'

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, DataLabelsPlugin)

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

  const chartData: ChartData<'pie'> = {
    labels: aggregatedData.map((fruit) => `${fruit.name} (×${fruit.count})`),
    datasets: [
      {
        data: aggregatedData.map((fruit) => fruit.calories),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
        ],
      },
    ],
  }

  const chartOptions = {
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.raw
            const percentage = ((value / totalCalories) * 100).toFixed(1)
            const fruit = aggregatedData[context.dataIndex]
            return `${fruit.name} (×${fruit.count}): ${value} cal (${percentage}%)`
          },
        },
      },
      datalabels: {
        color: 'white',
        display: (context: any) => {
          const fruit = aggregatedData[context.dataIndex]
          return fruit.count > 1 // Only show lines for multiple instances
        },
        formatter: () => '',
        font: {
          weight: 'bold' as const,
        },
        listeners: {
          enter: (context: any) => {
            const fruit = aggregatedData[context.dataIndex]
            if (fruit.count > 1) {
              const segments = fruit.segments
              const totalSegments = segments.length

              // Draw segment lines
              for (let i = 1; i < totalSegments; i++) {
                const percentage = i / totalSegments
                context.chart.ctx.beginPath()
                context.chart.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'
                context.chart.ctx.lineWidth = 1
                const angle =
                  context.startAngle +
                  (context.endAngle - context.startAngle) * percentage
                context.chart.ctx.arc(
                  context.chart.chartArea.left +
                    context.chart.chartArea.width * 0.5,
                  context.chart.chartArea.top +
                    context.chart.chartArea.height * 0.5,
                  context.outerRadius,
                  angle,
                  angle
                )
                context.chart.ctx.stroke()
              }
            }
          },
        },
      },
    },
  }

  return (
    <div className="p-4 bg-white rounded-lg">
      <Pie data={chartData} options={chartOptions} />
    </div>
  )
}
