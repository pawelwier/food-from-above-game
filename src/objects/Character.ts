import { Resource, Sprite, Texture } from "pixi.js";
import { Coordinates } from "../types/Coordinates";
import { Size } from "../types/Size";
import { Direction } from "../enum/Direction";
import { idleFrames, leftFrames, rightFrames } from "../utils";

export class Character {
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

  constructor(width: number, height: number, x: number, y: number, frameSet: Texture<Resource>[], charSpeed: number, charHps: number) {
    this.size = { width, height }
    this.coordinates = { x, y }
    this.frames = frameSet
    this.speed = charSpeed
    this.hps = charHps
    this.velocity = 10
    this.scale = 1.0
    this.animationSpeed = 0.20
    this.anchor = 0.0
    this.sprite = new Sprite(this.texture)
  }

  setTexture() {
    this.texture = this.frames[this.frame]
    this.sprite.x = this.coordinates.x
    this.sprite.y = this.coordinates.y
    this.sprite.texture = this.texture
  }

  moveX(destX: number, screenWidth: number) {
    if (destX > 0 && destX < screenWidth - this.size.width)
    this.coordinates.x = destX
  }

  getSpriteset(prevCharPosition: number) {
    this.frames = this.coordinates.x > prevCharPosition 
      ? rightFrames : this.coordinates.x < prevCharPosition
        ? leftFrames : idleFrames
  }

  removeHp(hpCount: number = 1) {
    this.hps -= hpCount
  }
}