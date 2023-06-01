import { GameState } from "../enum/GameState"
import { FoodItem } from "../objects/FoodItem"
import { Diet } from "../interfaces/Diet"
import { getRandom } from "../utils"
import { GameOptions } from "./GameOptions"

export class Game {
  state: GameState
  foodItems: FoodItem[]
  options: GameOptions
  score: number

  constructor(gameOptions: GameOptions) {
    this.score = 0
    this.state = GameState.new
    this.foodItems = []
    this.options = gameOptions
  }

  addFoodItem(diet: Diet) {
    const itemAxis = getRandom({ max: this.options.width - 16 /* TODO: item width */ })
    const foodItem = new FoodItem(itemAxis)

    const itemIndexList = diet.indexList
    const index = getRandom({ max: itemIndexList.length - 1 })

    foodItem.createSprite(itemIndexList[index])
    this.foodItems = [...this.foodItems, foodItem]
  }

  // here or move to Character?
  removeItem(item: FoodItem) { // TODO: better way to find which item to remove
    this.foodItems = this.foodItems.filter(({ coordinates }) => coordinates.x !== item.coordinates.x)
  }

  addToScore(points: number) {
    this.score += points * this.options.pointsRatio
  }
}