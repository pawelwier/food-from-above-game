export interface HtmlServiceInterface {
  byId(id: string): HTMLElement
  renderRadioSelect({ element, items, title }: { 
    element: HTMLElement, items: SelectableConfig[], title: string
  }): void 
  parseHps(hps: number): string
  updateCatcherHps(hps: number): void
  onGameOver(game: Game): void
}