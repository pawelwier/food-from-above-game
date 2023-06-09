export interface CharacterInterface {
  size: Size
  coordinates: Coordinates
  frames: Array<Texture<Resource>>
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

  loadTextures: () => void
  updateFrame: () => void
  setTexture: () => void
  moveX: (destX: number, screenWidth: number) => void
  getSpriteset: (prevCharPosition: number) => void
  subtractHp: (hpCount: number = 1) => number
}
