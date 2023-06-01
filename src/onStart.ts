import { startGame } from "./startGame"
import { Diet } from "./interfaces/Diet"
import { DifficultyLevel } from "./interfaces/DifficultyLevel"
import { byId, parseHps } from "./utils/htmlUtils"

export const onStart = ({ difficulty, diet }: { difficulty: DifficultyLevel, diet: Diet }): void => {
  const INIT_SCORE = 0 // TODO: move out

  const preGameMenu: HTMLElement = byId('pre-game-menu')
  preGameMenu.style.display = 'none'

  const gameMenu: HTMLElement = byId('game-menu')
  gameMenu.style.display = 'block'

  byId('points').innerText = String(INIT_SCORE)
  byId('hps').innerText = parseHps(difficulty.hps)

  startGame({ difficulty, diet })
}