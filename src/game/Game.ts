import { GameState } from "../enum/GameState"
import { FoodItem } from "../objects/FoodItem"
import { Diet } from "../interfaces/Diet"
import { getRandom } from "../utils"
import { GameOptions } from "./GameOptions"
import { BASE } from "../configs/base"
import { Character } from "../objects/Character"
import { HtmlServiceInterface } from "../interfaces/services/HtmlServiceInterface"
import { DifficultyLevel } from "../interfaces/DifficultyLevel"
import { GameInterface } from "../interfaces/GameInterface"

// TODO: add interfaces to classes
export class Game implements GameInterface {
  state: GameState
  catcher: Character
  foodItems: FoodItem[]
  options: GameOptions
  score: number
  level: number
  caughtThisLevel: number
  itemsPerLevel: number
  htmlService: HtmlServiceInterface
  difficulty: DifficultyLevel
  diet: Diet
  keyPressed: Record<string, boolean>

  constructor(gameOptions: GameOptions, character: Character, service: HtmlServiceInterface, difficultyLevel: DifficultyLevel, selectedDiet: Diet) {
    this.score = 0
    this.level = 1
    this.caughtThisLevel = 0
    this.itemsPerLevel = BASE.itemsPerLevel
    this.state = GameState.ready
    this.foodItems = []
    this.options = gameOptions
    this.catcher = character
    this.htmlService = service
    this.difficulty = difficultyLevel
    this.diet = selectedDiet
    this.keyPressed = {}

    this.addKeyListeners()
  }

  addKeyListeners(): void {
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      this.keyPressed[e.code] = true
    })
  
    window.addEventListener('keyup', (e: KeyboardEvent) => {
      this.keyPressed[e.code] = false
    })
  }

  addFoodItem(diet: Diet): void {
    const itemAxis = getRandom({ max: this.options.width - 16 /* TODO: item width */ })
    const foodItem = new FoodItem(itemAxis)

    const itemIndexList = diet.indexList
    const index = getRandom({ max: itemIndexList.length - 1 })

    foodItem.createSprite(itemIndexList[index])
    this.foodItems = [...this.foodItems, foodItem]
  }
  
  addToScore(): void {
    this.score += this.options.pointsPerCatch
  }

  checkNewLevel(): void {
    if (this.caughtThisLevel < this.itemsPerLevel) return
    this.level++
    this.options.newLevel()
    this.caughtThisLevel = 0
    this.checkAddHp()
  }

  checkAddHp(): void {
    const hasMax = this.catcher.hps >= this.options.charHps
    if (hasMax) return
    this.catcher.hps++
    this.htmlService.updateCatcherHps(this.catcher.hps)
  }

  onItemCaught(): void {
    this.addToScore()
    this.caughtThisLevel++
    this.checkNewLevel()
  }

  removeItem({ item, caught }: { item: FoodItem, caught: boolean }): void { // TODO: better way to find which item to remove
    this.foodItems = this.foodItems.filter(({ coordinates }) => coordinates.x !== item.coordinates.x)
    if (caught) this.onItemCaught()
  }

  subtractCatcherHp(): void {
    const hps = this.catcher.subtractHp()
    if (hps <= 0) this.gameOver()
  }

  isState(state: GameState): boolean {
    return this.state === state
  }

  gameOver(): void {
    this.state = GameState.over
    this.catcher.sprite.y += this.catcher.sprite.height
    this.catcher.sprite.rotation -= Math.PI / 2
    this.htmlService.onGameOver(this)
  }

  listenToKeyEvents(): void {
    if (this.keyPressed['ArrowRight']) { this.catcher.moveX(this.catcher.coordinates.x + this.catcher.speed, this.options.width) }
    if (this.keyPressed['ArrowLeft']) { this.catcher.moveX(this.catcher.coordinates.x - this.catcher.speed, this.options.width) }
  }

  checkCollision(item: FoodItem): boolean {
    return (
      item.sprite.y + item.sprite.height > this.catcher.coordinates.y
      && item.sprite.x < this.catcher.coordinates.x + this.catcher.size.width 
      && item.sprite.x + item.sprite.width > this.catcher.coordinates.x
    )
  }

  itemLost(item: FoodItem): boolean {
    return item.coordinates.y > this.options.height - item.sprite.height
  }
}