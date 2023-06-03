import { type Resource, Sprite, Texture } from 'pixi.js'
import { type Coordinates } from '../types/Coordinates'
import { type Size } from '../types/Size'
import { type Direction } from '../enum/Direction'
import { type CharacterInterface } from '../interfaces/CharacterInterface'
import { type GameOptions } from '../game/GameOptions'
import { BASE } from '../configs/base'

export class Character implements CharacterInterface {
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
  idleFrames: Texture[]
  leftFrames: Texture[]
  rightFrames: Texture[]

  constructor (options: GameOptions) {
    this.loadTextures()
    const width = 50 // get from sprite size
    const height = 70 // get from sprite size
    const initPosition = [options.width / 2 - width / 2, options.height - height]
    this.size = { width, height }
    this.coordinates = { x: initPosition[0], y: initPosition[1] }
    this.frames = this.idleFrames
    this.speed = BASE.characterSpeed
    this.hps = options.charHps
    this.velocity = 10
    this.scale = 1.0
    this.animationSpeed = 0.20
    this.anchor = 0.5
    this.sprite = new Sprite(this.texture)
  }

  loadTextures (): void {
    this.idleFrames = Array.from({ length: BASE.frameCount }, (_, i) => Texture.from(`character/char_idle_${i}.png`))
    this.leftFrames = Array.from({ length: BASE.frameCount }, (_, i) => Texture.from(`character/char_run_left_${i}.png`))
    this.rightFrames = Array.from({ length: BASE.frameCount }, (_, i) => Texture.from(`character/char_run_right_${i}.png`))
  }

  updateFrame (): void {
    const nextFrame = this.frame + 1
    this.frame = nextFrame < BASE.frameCount ? nextFrame : 0
  }

  setTexture (): void {
    this.updateFrame()
    this.texture = this.frames[this.frame]
    this.sprite.x = this.coordinates.x
    this.sprite.y = this.coordinates.y
    this.sprite.texture = this.texture
  }

  moveX (destX: number, screenWidth: number): void {
    if (destX > 0 && destX < screenWidth - this.size.width) { this.coordinates.x = destX }
  }

  getSpriteset (prevCharPosition: number): void {
    this.frames = this.coordinates.x > prevCharPosition
      ? this.rightFrames
      : this.coordinates.x < prevCharPosition
        ? this.leftFrames
        : this.idleFrames
  }

  subtractHp (hpCount: number = 1): number {
    this.hps -= hpCount
    return this.hps
  }
}
