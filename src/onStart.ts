import { startGame } from "./startGame"
import { Diet } from "./types/Diet"
import { DifficultyLevel } from "./types/DifficultyLevel"
import { byId } from "./utils/htmlUtils"

export const onStart = ({ difficulty, diet }: { difficulty: DifficultyLevel, diet: Diet }): void => {
  const INIT_SCORE = 0 // TODO: move out

  const preGameMenu: HTMLElement = byId('pre-game-menu')
  preGameMenu.style.display = 'none'

  const gameMenu: HTMLElement = byId('game-menu')
  gameMenu.style.display = 'block'

  byId('points').innerText = String(INIT_SCORE)
  byId('hps').innerText = String(difficulty.hps)

  startGame({ difficulty, diet })
}