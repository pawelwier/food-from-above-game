import { BaseTexture, Rectangle, Sprite, Texture } from "pixi.js";
import { Coordinates } from "../types/Coordinates";
import { Size } from "../types/Size";

export class FoodItem {
  size: Size
  coordinates: Coordinates
  speed: number
  sprite: Sprite

  constructor(itemX: number) {
    this.size = { width: 16, height: 16 }
    this.coordinates = { x: itemX, y: 0 }
  }

  createSprite(index: number) {
    const BASE_WIDTH = 128 // TODO: get from texture
    const colCount = BASE_WIDTH / this.size.width

    const y = Math.floor(index / colCount)
    const x = !y ? index : index % colCount

    console.log({index, x, y})
    
    const rect = new Rectangle(x * this.size.width, y * this.size.height, this.size.width, this.size.height)
    const foodBase = new BaseTexture('food/food.png')
    const food = new Texture(foodBase, rect)
    this.sprite = new Sprite(food)
  }

  setTexture() {
    this.sprite.x = this.coordinates.x
    this.sprite.y = this.coordinates.y
  }
}