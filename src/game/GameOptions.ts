import { BASE } from "../configs/base"

export class GameOptions {
  width: number
  height: number
  itemSpeed: number
  charHps: number
  pointsPerCatch: number
  
  constructor(screenWidth: number, screenHeight: number, speed: number, hps: number, ratio: number) {
    this.width = screenWidth
    this.height = screenHeight
    this.itemSpeed = speed
    this.charHps = hps
    this.pointsPerCatch = BASE.pointsBase * ratio
  }

  newLevel() {
    this.itemSpeed = Math.floor(this.itemSpeed * 1.2)
  }
}