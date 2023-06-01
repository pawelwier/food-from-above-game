import { diets } from './configs/diets';
import { byId } from './utils/htmlUtils';

export const renderDietSelect = () => {
  const diet = byId('diet-select') as HTMLFieldSetElement

  diets.forEach(({ id, name }) => {
    const option: HTMLInputElement = diet.appendChild(document.createElement('input'))
    option.setAttribute('type', 'radio')
    option.setAttribute('name', 'diet')
    option.setAttribute('value', String(id))
    option.setAttribute('id', `diet-${String(id)}`)

    const label: HTMLLabelElement = diet.appendChild(document.createElement('label'))
    label.setAttribute('for', `diet-${String(id)}`)
    label.innerText = name
  })
}