import { startGame } from "./startGame"
import { Diet } from "./interfaces/Diet"
import { DifficultyLevel } from "./interfaces/DifficultyLevel"
import { HtmlService } from "./services/HtmlService"
import { BASE } from "./configs/base"

export const onStart = ({ difficulty, diet }: { difficulty: DifficultyLevel, diet: Diet }): void => {
  const htmlService = new HtmlService()

  const preGameMenu: HTMLElement = htmlService.byId('pre-game-menu')
  preGameMenu.style.display = 'none'

  const gameMenu: HTMLElement = htmlService.byId('game-menu')
  gameMenu.style.display = 'block'

  htmlService.byId('points').innerText = String(BASE.initScore)
  htmlService.byId('level').innerText = String(BASE.initLevel)
  htmlService.byId('hps').innerText = htmlService.parseHps(difficulty.hps)

  startGame({ difficulty, diet })
}