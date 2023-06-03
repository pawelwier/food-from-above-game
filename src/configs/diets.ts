import { type Diet } from '../interfaces/Diet'

export const diets: Diet[] = [{
  id: 0,
  name: 'All',
  indexList: Array.from({ length: 64 }).map((_, i) => i)
}, {
  id: 1,
  name: 'Sushi',
  indexList: [6, 7]
}, {
  id: 2,
  name: 'Fruit & Veg',
  indexList: [12, 13, 14, 15, 18, 27, 28, 29, 32, 33, 34, 35, 39, 46, 47, 48, 49, 51, 54, 56, 59]
}]
