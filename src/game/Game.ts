import { Assets, BaseTexture } from 'pixi.js'
import { GameState } from '../enum/GameState'
import { FoodItem } from '../objects/FoodItem'
import { type Diet } from '../interfaces/Diet'
import { getRandom } from '../utils'
import { type GameOptions } from './GameOptions'
import { BASE } from '../configs/base'
import { type Character } from '../objects/Character'
import { type HtmlServiceInterface } from '../interfaces/services/HtmlServiceInterface'
import { type DifficultyLevel } from '../interfaces/DifficultyLevel'
import { type GameInterface } from '../interfaces/GameInterface'

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
  itemTextures: BaseTexture
  caughtItemCount: number
  totalItemCount: number
  canFlash: boolean

  constructor (
    gameOptions: GameOptions,
    character: Character,
    service: HtmlServiceInterface,
    difficultyLevel: DifficultyLevel,
    selectedDiet: Diet
  ) {
    this.score = BASE.initScore
    this.level = BASE.initLevel
    this.caughtThisLevel = 0
    this.caughtItemCount = 0
    this.totalItemCount = 0
    this.itemsPerLevel = BASE.itemsPerLevel
    this.state = GameState.running
    this.foodItems = []
    this.options = gameOptions
    this.catcher = character
    this.htmlService = service
    this.difficulty = difficultyLevel
    this.diet = selectedDiet
    this.keyPressed = {}
    this.canFlash = true

    this.addKeyListeners()
  }

  addKeyListeners (): void {
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      this.keyPressed[e.code] = true
    })

    window.addEventListener('keyup', (e: KeyboardEvent) => {
      this.keyPressed[e.code] = false
    })
  }

  createFoodItem (): FoodItem {
    const itemAxis = getRandom({ max: this.options.width - BASE.foodItemSize.width })
    return new FoodItem(this, itemAxis, this.totalItemCount)
  }

  addFoodItem (diet: Diet): void {
    const foodItem = this.createFoodItem()
    foodItem.createSprite(diet)
    this.foodItems = [...this.foodItems, foodItem]
    this.totalItemCount++
  }

  addToScore (): void {
    this.score += this.options.pointsPerCatch
  }

  onNewLevel (): void {
    this.level++
    this.options.newLevel()
    this.caughtThisLevel = 0
    this.checkAddHp()
    setTimeout(() => {
      this.canFlash = true
      this.htmlService.onToggleFlash(true)
    }, 300)
  }

  checkNewLevel (itemsCaught: number): boolean {
    return itemsCaught >= this.itemsPerLevel
  }

  checkAddHp (): void {
    const hasMax = this.catcher.hps >= this.options.charHps
    if (hasMax) return
    this.catcher.hps++
    this.htmlService.updateCatcherHps(this.catcher.hps)
  }

  onItemCaught (): void {
    this.addToScore()
    this.caughtThisLevel++
    this.caughtItemCount++
    if (this.checkNewLevel(this.caughtThisLevel)) this.onNewLevel()
    this.htmlService.byId('points').innerText = String(this.score)
    this.htmlService.byId('level').innerText = String(this.level)
  }

  onItemLost (): void {
    this.subtractCatcherHp()
    this.htmlService.updateCatcherHps(this.catcher.hps)
  }

  removeItem ({ item, caught }: { item: FoodItem, caught: boolean }): void {
    this.foodItems = this.foodItems.filter(({ index }) => index !== item.index)
    this.handleItemOut(caught)
    item.remove()
  }

  subtractCatcherHp (): void {
    const hps = this.catcher.subtractHp()
    if (hps <= 0) this.gameOver()
  }

  isState (state: GameState): boolean {
    return this.state === state
  }

  gameOver (): void {
    this.state = GameState.over
    this.catcher.sprite.y += this.catcher.sprite.height * 1.2
    this.catcher.sprite.rotation -= Math.PI / 2
    this.htmlService.onGameOver({ score: this.score, level: this.level, items: this.caughtItemCount })
  }

  listenToKeyEvents (): void {
    if (this.keyPressed.ArrowRight) this.catcher.moveX(this.catcher.coordinates.x + this.catcher.speed, this.options.width)
    if (this.keyPressed.ArrowLeft) this.catcher.moveX(this.catcher.coordinates.x - this.catcher.speed, this.options.width)
    if (this.keyPressed.Space) this.flash()
  }

  checkCollision (item: FoodItem): boolean {
    return (
      item.sprite.y + item.sprite.height > this.catcher.coordinates.y &&
      item.sprite.x < this.catcher.coordinates.x + this.catcher.size.width &&
      item.sprite.x + item.sprite.width > this.catcher.coordinates.x
    )
  }

  itemLost (item: FoodItem): boolean {
    return item.coordinates.y > this.options.height - item.sprite.height
  }

  handleItemOut (caught: boolean): void {
    caught ? this.onItemCaught() : this.onItemLost()
  }

  async loadBaseTexture (): Promise<void> {
    await Assets.load(BASE.baseTexture)
    this.itemTextures = BaseTexture.from(BASE.baseTexture)
  }

  flash (): void {
    if (!this.canFlash) return
    this.canFlash = false
    this.htmlService.onToggleFlash(false)
    this.htmlService.onFlash()
    this.foodItems.forEach(item => { this.removeItem({ item, caught: true }) })
  }
}
