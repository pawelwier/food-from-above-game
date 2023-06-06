import { Application, type ICanvas } from 'pixi.js'
import { diets } from '../configs/diets'
import { difficultyLevels } from '../configs/difficultyLevels'
import { type Game } from '../game/Game'
import { type Diet } from '../interfaces/Diet'
import { type DifficultyLevel } from '../interfaces/DifficultyLevel'
import { type SelectableConfig } from '../interfaces/SelectableConfig'
import { type HtmlServiceInterface } from '../interfaces/services/HtmlServiceInterface'
import { startGame } from '../startGame'
import { BASE } from '../configs/base'

export class HtmlService implements HtmlServiceInterface {
  byId = (id: string): HTMLElement => document.getElementById(id)

  renderApp (): Application<ICanvas> {
    const app = new Application<HTMLCanvasElement>({
      width: BASE.screenWidth,
      height: BASE.screenHeight,
      antialias: true,
      resolution: 1,
      backgroundAlpha: 0.1
    })

    document.body.appendChild(app.view)

    return app
  }

  renderRadioSelect ({ element, items, title }: {
    element: HTMLElement
    items: SelectableConfig[]
    title: string
  }): void {
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

  parseHps (hps: number): string {
    return Array.from({ length: hps }).map(_ => '❤').join('')
  }

  updateCatcherHps (hps: number): void {
    this.byId('hps').innerText = this.parseHps(hps)
  }

  onGameOver ({ score, level, items }: { score: number, level: number, items: number }): void {
    this.byId('game-over-frame').style.display = 'block'
    this.byId('game-score').innerText = String(score)
    this.byId('game-level').innerText = String(level)
    this.byId('game-items').innerText = String(items)
    this.byId('menu-button').addEventListener('click', () => {
      this.backToMenu()
    })
  }

  onMenuOnChange ({ name, data }: { name: string, data: SelectableConfig[] }): SelectableConfig {
    const elements = Array.from(document.getElementsByName(name)) as HTMLInputElement[]
    const selectedLevelId: string = elements.find(r => r.checked).value
    return data.find(({ id }) => String(id) === selectedLevelId)
  }

  htmlInit (): void {
    const difficultySelect = this.byId('difficulty-select')
    const dietSelect = this.byId('diet-select')
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

    startButton.addEventListener('click', () => {
      startGame({ difficulty, diet }).catch(e => { console.error('Launching game failed', e) })
    })
  }

  onGameStart (game: Game): void {
    const preGameMenu: HTMLElement = this.byId('pre-game-menu')
    preGameMenu.style.display = 'none'

    const gameMenu: HTMLElement = this.byId('game-menu')
    gameMenu.style.visibility = 'visible'

    this.byId('game-stats-container').style.display = 'grid'
    this.byId('points').innerText = String(BASE.initScore)
    this.byId('level').innerText = String(BASE.initLevel)
    this.byId('flash').style.visibility = 'visible'
    this.byId('hps').innerText = this.parseHps(game.difficulty.hps)
  }

  backToMenu (): void {
    const canvas = document.querySelector('canvas')
    canvas?.remove()
    this.byId('game-over-frame').style.display = 'none'
    this.byId('game-stats-container').style.display = 'none'
    this.byId('pre-game-menu').style.display = 'flex'
  }

  onToggleFlash (show: boolean): void {
    this.byId('flash').style.visibility = show ? 'visible' : 'hidden'
  }

  onFlash (): void {
    const flash: HTMLDivElement = this.byId('main-container').appendChild(document.createElement('div'))
    flash.setAttribute('class', 'flash-screen container-center uppercase')
    flash.setAttribute('style', `width: ${BASE.screenWidth}px; height: ${BASE.screenHeight}px;`)
    flash.innerText = '☇ Bang! ☇'
    setTimeout(() => {
      flash.remove()
    }, 50)
  }
}
