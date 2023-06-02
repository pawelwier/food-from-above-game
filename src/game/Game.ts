import { GameState } from "../enum/GameState"
import { FoodItem } from "../objects/FoodItem"
import { Diet } from "../interfaces/Diet"
import { getRandom } from "../utils"
import { GameOptions } from "./GameOptions"
import { BASE } from "../configs/base"
import { Character } from "../objects/Character"
import { HtmlServiceInterface } from "../interfaces/services/HtmlService"

// TODO: add interfaces to classes
export class Game {
  state: GameState
  catcher: Character
  foodItems: FoodItem[]
  options: GameOptions
  score: number
  level: number
  caughtThisLevel: number
  itemsPerLevel: number
  htmlService: HtmlServiceInterface

  constructor(gameOptions: GameOptions, character: Character, service: HtmlServiceInterface) {
    this.score = 0
    this.level = 1
    this.caughtThisLevel = 0
    this.itemsPerLevel = BASE.itemsPerLevel
    this.state = GameState.new
    this.foodItems = []
    this.options = gameOptions
    this.catcher = character
    this.htmlService = service
  }

  addFoodItem(diet: Diet) {
    const itemAxis = getRandom({ max: this.options.width - 16 /* TODO: item width */ })
    const foodItem = new FoodItem(itemAxis)

    const itemIndexList = diet.indexList
    const index = getRandom({ max: itemIndexList.length - 1 })

    foodItem.createSprite(itemIndexList[index])
    this.foodItems = [...this.foodItems, foodItem]
  }
  
  addToScore() {
    this.score += this.options.pointsPerCatch
  }

  checkNewLevel() {
    if (this.caughtThisLevel < this.itemsPerLevel) return
    this.level++
    this.options.newLevel()
    this.caughtThisLevel = 0
    this.checkAddHp()
  }

  checkAddHp() {
    const hasMax = this.catcher.hps >= this.options.charHps
    if (hasMax) return
    this.catcher.hps++
    this.htmlService.updateCatcherHps(this.catcher.hps)
  }

  onItemCaught() {
    this.addToScore()
    this.caughtThisLevel++
    this.checkNewLevel()
  }

  removeItem({ item, caught }: { item: FoodItem, caught: boolean }) { // TODO: better way to find which item to remove
    this.foodItems = this.foodItems.filter(({ coordinates }) => coordinates.x !== item.coordinates.x)
    if (caught) this.onItemCaught()
  }
}