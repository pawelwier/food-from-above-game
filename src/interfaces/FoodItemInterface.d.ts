export interface FoodItemInterface {
  size: Size
  coordinates: Coordinates
  speed: number
  sprite: Sprite
  index: number

  getSpriteIndex: (diet: Diet) => number
  createSprite: (diet: Diet) => void
  setSpriteLocation: (speed: number) => void
  remove: () => void
}
