import { Resource, Sprite, Texture } from "pixi.js";
import { Coordinates } from "../types/Coordinates";
import { Size } from "../types/Size";
import { Direction } from "../enum/Direction";
import { idleFrames, leftFrames, rightFrames } from "../utils";
import { CharacterInterface } from "../interfaces/CharacterInterface";
import { GameOptions } from "../game/GameOptions";
import { BASE } from "../configs/base";

export class Character implements CharacterInterface {
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

  constructor(width: number, height: number, frameSet: Texture<Resource>[], options: GameOptions) {
    const initPosition = [options.width / 2 - width  / 2, options.height - height]

    this.size = { width, height }
    this.coordinates = { x: initPosition[0], y: initPosition[1] }
    this.frames = frameSet
    this.speed = BASE.characterSpeed
    this.hps = options.charHps
    this.velocity = 10
    this.scale = 1.0
    this.animationSpeed = 0.20
    this.anchor = 0.5
    this.sprite = new Sprite(this.texture)
  }

  setTexture(): void {
    this.texture = this.frames[this.frame]
    this.sprite.x = this.coordinates.x
    this.sprite.y = this.coordinates.y
    this.sprite.texture = this.texture
  }

  moveX(destX: number, screenWidth: number): void {
    if (destX > 0 && destX < screenWidth - this.size.width)
    this.coordinates.x = destX
  }

  getSpriteset(prevCharPosition: number): void {
    this.frames = this.coordinates.x > prevCharPosition 
      ? rightFrames : this.coordinates.x < prevCharPosition
        ? leftFrames : idleFrames
  }

  subtractHp(hpCount: number = 1): number {
    this.hps -= hpCount
    return this.hps
  }
}