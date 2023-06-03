export interface FoodItemInterface {
  size: Size
  coordinates: Coordinates
  speed: number
  sprite: Sprite

  createSprite(index: number): void
  setSpriteLocation(speed: number): void
}