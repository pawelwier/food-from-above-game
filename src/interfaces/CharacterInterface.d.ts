export interface CharacterInterface {
  size: Size
  coordinates: Coordinates
  frames: Texture<Resource>[]
  frame: number
  speed: number
  hps: number
  velocity: number
  scale: number
  animationSpeed: number
  anchor: number
  texture: Texture<Resource>
  direction: Direction
  sprite: Sprite

  setTexture(): void
  moveX(destX: number, screenWidth: number): void
  getSpriteset(prevCharPosition: number): void
  subtractHp(hpCount: number = 1): number
}