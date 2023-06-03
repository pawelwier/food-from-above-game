import { BASE } from "../configs/base"

export class GameOptions {
  width: number
  height: number
  itemSpeed: number
  charHps: number
  pointsPerCatch: number
  itemInterval: number
  
  constructor(screenWidth: number, screenHeight: number, speed: number, hps: number, ratio: number, interval: number) {
    this.width = screenWidth
    this.height = screenHeight
    this.itemSpeed = speed
    this.charHps = hps
    this.pointsPerCatch = BASE.pointsBase * ratio
    this.itemInterval = BASE.itemInterval
  }

  newLevel() {
    this.itemSpeed = Math.floor(this.itemSpeed * 1.2)
  }
}