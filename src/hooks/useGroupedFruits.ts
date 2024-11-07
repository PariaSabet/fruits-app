import { Fruit, GroupingField } from '../types/fruit'

export function useGroupedFruits(fruits: Fruit[], groupBy: GroupingField) {
  if (groupBy === 'none') {
    return { none: fruits }
  }

  return fruits.reduce(
    (groups, fruit) => {
      const key = fruit[groupBy]
      if (!groups[key]) {
        groups[key] = []
      }
      groups[key].push(fruit)
      return groups
    },
    {} as Record<string, Fruit[]>
  )
}
