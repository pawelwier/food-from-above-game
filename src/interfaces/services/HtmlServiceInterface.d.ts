import { type Application } from 'pixi.js'
import { type Game } from '../../game/Game'

export interface HtmlServiceInterface {
  byId: (id: string) => HTMLElement
  renderRadioSelect: ({ element, items, title }: {
    element: HTMLElement
    items: SelectableConfig[]
    title: string
  }) => void
  parseHps: (hps: number) => string
  updateCatcherHps: (hps: number) => void
  onGameOver: ({ score, level, items }: { score: number, level: number, items: number }) => void
  htmlInit: () => void
  onGameStart: (game: Game) => void
  renderApp: () => Application<ICanvas>
}
