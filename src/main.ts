import { DifficultyLevel } from './interfaces/DifficultyLevel'
import { onStart } from './onStart'
import { Diet } from './interfaces/Diet'
import { difficultyLevels } from './configs/difficultyLevels'
import { diets } from './configs/diets'
import { HtmlService } from './services/HtmlService'

const htmlService = new HtmlService()

const difficultySelect = htmlService.byId('difficulty-select') as HTMLElement
const dietSelect = htmlService.byId('diet-select') as HTMLElement
const startButton = htmlService.byId('start-button') as HTMLButtonElement

let difficulty: DifficultyLevel
let diet: Diet

htmlService.renderRadioSelect({ 
  element: difficultySelect, items: difficultyLevels, title: 'difficulty-level' 
})
htmlService.renderRadioSelect({ 
  element: dietSelect, items: diets, title: 'diet' 
})

const readyToStart = () => (difficulty && diet)

// TODO: extract as utils
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
