import { Rectangle, Sprite, Texture } from 'pixi.js'
import { type Coordinates } from '../types/Coordinates'
import { type Size } from '../types/Size'
import { type FoodItemInterface } from '../interfaces/FoodItemInterface'
import { type Game } from '../game/Game'
import { BASE } from '../configs/base'

export class FoodItem implements FoodItemInterface {
  game: Game
  size: Size
  coordinates: Coordinates
  speed: number
  sprite: Sprite
  index: number

  constructor (gameObject: Game, itemX: number, i: number) {
    this.game = gameObject
    this.size = { width: BASE.foodItemSize.width, height: BASE.foodItemSize.height }
    this.coordinates = { x: itemX, y: 0 }
    this.index = i
  }

  createSprite (index: number): void {
    const colCount = this.game.itemTextures.width / this.size.width

    const y = Math.floor(index / colCount)
    const x = !y ? index : index % colCount

    const rect = new Rectangle(x * this.size.width, y * this.size.height, this.size.width, this.size.height)
    const food = new Texture(this.game.itemTextures, rect)
    this.sprite = new Sprite(food)
  }

  setSpriteLocation (speed: number): void {
    this.coordinates.y += speed
    this.sprite.x = this.coordinates.x
    this.sprite.y = this.coordinates.y
  }
}
