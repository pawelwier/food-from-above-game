import { Coordinates } from "../types/Coordinates"

export class GameOptions {
  width: number
  height: number
  charSpeed: number
  charHps: number
  // spriteRowsCols: Coordinates
  pointsRatio: number
  
  constructor(screenWidth: number, screenHeight: number, speed: number, hps: number, ratio: number) {
    this.width = screenWidth
    this.height = screenHeight
    this.charSpeed = speed
    this.charHps = hps
    // this.spriteRowsCols = { x: 8, y: 8 }
    this.pointsRatio = ratio
  }
}