import { SelectableConfig } from "../interfaces/SelectableConfig"

export interface DifficultyLevel extends SelectableConfig {
  speed: number
  pointsRatio: number
  hps: number
}