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

const readyToStart = (): boolean => !!difficulty && !!diet

difficultySelect.addEventListener('change', () => { 
  difficulty = htmlService.onMenuOnChange({ name: 'difficulty-level', data: difficultyLevels }) as DifficultyLevel
  if (readyToStart()) startButton.disabled = false
})

dietSelect.addEventListener('change', () => { 
  diet = htmlService.onMenuOnChange({ name: 'diet', data: diets }) as Diet
  if (readyToStart()) startButton.disabled = false
})

startButton.addEventListener('click', () => onStart({ difficulty, diet }))
