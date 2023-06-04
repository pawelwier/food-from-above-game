export interface FoodItemInterface {
  size: Size
  coordinates: Coordinates
  speed: number
  sprite: Sprite
  index: number

  createSprite: (index: number) => void
  setSpriteLocation: (speed: number) => void
}
