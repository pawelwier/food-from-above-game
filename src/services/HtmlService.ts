import { SelectableConfig } from "../interfaces/SelectableConfig"
import { HtmlServiceInterface } from '../interfaces/services/HtmlService'

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
}