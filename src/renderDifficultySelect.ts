import { difficultyLevels } from './configs/difficultyLevels';
import { byId } from './utils/htmlUtils';

export const renderDifficultySelect = () => {
  const difficulty = byId('difficulty-select') as HTMLFieldSetElement

  difficultyLevels.forEach(({ id, name }) => {
    const option: HTMLInputElement = difficulty.appendChild(document.createElement('input'))
    option.setAttribute('type', 'radio')
    option.setAttribute('name', 'difficulty-level')
    option.setAttribute('value', String(id))
    option.setAttribute('id', `difficulty-${String(id)}`)

    const label: HTMLLabelElement = difficulty.appendChild(document.createElement('label'))
    label.setAttribute('for', `difficulty-${String(id)}`)
    label.innerText = name
  })
}