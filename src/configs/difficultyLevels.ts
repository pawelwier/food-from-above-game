import { DifficultyLevel } from "../interfaces/DifficultyLevel";

export const difficultyLevels: DifficultyLevel[] = [{
  id: 0,
  name: 'Normal',
  speed: 10,
  pointsRatio: 1,
  hps: 10
}, {
  id: 1,
  name: 'Hard',
  speed: 16,
  pointsRatio: 1.5,
  hps: 5
}, {
  id: 2,
  name: 'BERSERKER!!!',
  speed: 20,
  pointsRatio: 2,
  hps: 3
}]