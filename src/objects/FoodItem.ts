import { BaseTexture, Rectangle, Sprite, Texture } from 'pixi.js'
import { type Coordinates } from '../types/Coordinates'
import { type Size } from '../types/Size'
import { type FoodItemInterface } from '../interfaces/FoodItemInterface'

export class FoodItem implements FoodItemInterface {
  size: Size
  coordinates: Coordinates
  speed: number
  sprite: Sprite

  constructor (itemX: number) {
    this.size = { width: 16, height: 16 }
    this.coordinates = { x: itemX, y: 0 }
  }

  createSprite (index: number): void {
    const BASE_WIDTH = 128 // TODO: get from texture
    const colCount = BASE_WIDTH / this.size.width

    const y = Math.floor(index / colCount)
    const x = !y ? index : index % colCount

    const rect = new Rectangle(x * this.size.width, y * this.size.height, this.size.width, this.size.height)
    const foodBase = new BaseTexture('food/food.png')
    const food = new Texture(foodBase, rect)
    this.sprite = new Sprite(food)
  }

  setSpriteLocation (speed: number): void {
    this.coordinates.y += speed
    this.sprite.x = this.coordinates.x
    this.sprite.y = this.coordinates.y
  }
}
