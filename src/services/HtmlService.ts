import { Application } from "pixi.js"
import { backToMenu } from "../backToMenu"
import { diets } from "../configs/diets"
import { difficultyLevels } from "../configs/difficultyLevels"
import { Game } from "../game/Game"
import { Diet } from "../interfaces/Diet"
import { DifficultyLevel } from "../interfaces/DifficultyLevel"
import { SelectableConfig } from "../interfaces/SelectableConfig"
import { HtmlServiceInterface } from '../interfaces/services/HtmlServiceInterface'
import { startGame } from "../startGame"
import { BASE } from "../configs/base"

export class HtmlService implements HtmlServiceInterface {
  byId = (id: string): HTMLElement => document.getElementById(id)

  renderRadioSelect = ({ element, items, title }: { 
    element: HTMLElement, items: SelectableConfig[], title: string
  }): void => {
    items.forEach(({ id, name }) => {
      const option: HTMLInputElement = element.appendChild(document.createElement('input'))
      option.setAttribute('type', 'radio')
      option.setAttribute('name', title)
      option.setAttribute('value', String(id))
      option.setAttribute('id', `${title}-${String(id)}`)

      const label: HTMLLabelElement = element.appendChild(document.createElement('label'))
      label.setAttribute('for', `${title}-${String(id)}`)
      label.innerText = name
    })
  }

  parseHps = (hps: number): string => {
    return Array.from({ length: hps }).map(_ => '❤').join('')
  }

  updateCatcherHps(hps: number): void {
    this.byId('hps').innerText = this.parseHps(hps)
  }

  onGameOver(game: Game): void {
    this.byId('game-over-frame').style.display = 'block'
    this.byId('menu-button').addEventListener('click', () => {
      backToMenu()
    })
    this.byId('restart-button').addEventListener('click', () => {
      // startGame({ difficulty: game.difficulty, diet: game.diet })
    })
  }

  onMenuOnChange({ name, data }: { name: string, data: SelectableConfig[] }): SelectableConfig {
    const elements = Array.from(document.getElementsByName(name)) as HTMLInputElement[]
    const selectedLevelId: string = elements.find(r => r.checked).value
    return data.find(({ id }) => String(id) === selectedLevelId)
  }

  htmlInit(app: Application): void {
    const difficultySelect = this.byId('difficulty-select') as HTMLElement
    const dietSelect = this.byId('diet-select') as HTMLElement
    const startButton = this.byId('start-button') as HTMLButtonElement

    let difficulty: DifficultyLevel
    let diet: Diet

    this.renderRadioSelect({ 
      element: difficultySelect, items: difficultyLevels, title: 'difficulty-level' 
    })

    this.renderRadioSelect({ 
      element: dietSelect, items: diets, title: 'diet' 
    })

    const readyToStart = (): boolean => !!difficulty && !!diet

    difficultySelect.addEventListener('change', () => { 
      difficulty = this.onMenuOnChange({ name: 'difficulty-level', data: difficultyLevels }) as DifficultyLevel
      if (readyToStart()) startButton.disabled = false
    })

    dietSelect.addEventListener('change', () => { 
      diet = this.onMenuOnChange({ name: 'diet', data: diets }) as Diet
      if (readyToStart()) startButton.disabled = false
    })

    startButton.addEventListener('click', () => startGame({ app, difficulty, diet }))
  }

  onGameStart(game: Game): void {
    const preGameMenu: HTMLElement = this.byId('pre-game-menu')
    preGameMenu.style.display = 'none'
  
    const gameMenu: HTMLElement = this.byId('game-menu')
    gameMenu.style.visibility = 'visible'
  
    this.byId('points').innerText = String(BASE.initScore)
    this.byId('level').innerText = String(BASE.initLevel)
    this.byId('hps').innerText = this.parseHps(game.difficulty.hps)
  }
}