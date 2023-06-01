import { DifficultyLevel } from './types/DifficultyLevel';
import { renderDifficultySelect } from './renderDifficultySelect';
import { onStart } from './onStart';
import { renderDietSelect } from './renderDietSelect';
import { Diet } from './types/Diet';
import { byId } from './utils/htmlUtils';
import { difficultyLevels } from './configs/difficultyLevels';
import { diets } from './configs/diets';

renderDifficultySelect()
renderDietSelect()

const startButton = byId('start') as HTMLButtonElement
const difficultySelect = byId('difficulty-select') as HTMLFieldSetElement
const dietSelect = byId('diet-select') as HTMLFieldSetElement

let difficulty: DifficultyLevel
let diet: Diet

const readyToStart = () => (difficulty && diet)

difficultySelect.addEventListener('change', () => { 
  const levelElements = Array.from(document.getElementsByName("difficulty-level")) as HTMLInputElement[]
  const selectedLevelId: string = levelElements.find(r => r.checked).value
  difficulty = difficultyLevels.find(({ id }) => String(id) === selectedLevelId)
  if (readyToStart()) startButton.disabled = false
})

dietSelect.addEventListener('change', () => { 
  const dietElements = Array.from(document.getElementsByName("diet")) as HTMLInputElement[]
  const selectedDietId: string = dietElements.find(r => r.checked).value
  diet = diets.find(({ id }) => String(id) === selectedDietId)
  if (readyToStart()) startButton.disabled = false
})

startButton.addEventListener('click', () => onStart({ difficulty, diet }))
