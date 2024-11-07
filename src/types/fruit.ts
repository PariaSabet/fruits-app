export interface Nutrition {
  calories: number
  fat: number
  sugar: number
  carbohydrates: number
  protein: number
}

export interface Fruit {
  name: string
  id: number
  family: string
  order: string
  genus: string
  nutritions: Nutrition
}

export type GroupingField = 'none' | 'family' | 'order' | 'genus'

export type ViewType = 'list' | 'table'
