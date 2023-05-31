import { GameState } from "../enum/GameState"

export class Game {
  state: GameState
  width: number
  height: number

  constructor(screenWidth: number, screenHeight: number) {
    this.width = screenWidth
    this.height = screenHeight
    this.state = GameState.new
  }
}

export class GameOptions {
  charSpeed: number
  charHps: number

  constructor(speed: number, hps: number) {
    this.charSpeed = speed
    this.charHps = hps
  }
}