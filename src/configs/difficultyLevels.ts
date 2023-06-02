import { DifficultyLevel } from "../interfaces/DifficultyLevel";

export const difficultyLevels: DifficultyLevel[] = [{
  id: 0,
  name: 'Normal',
  speed: 15,
  pointsRatio: 1,
  hps: 10
}, {
  id: 1,
  name: 'Hard',
  speed: 20,
  pointsRatio: 1.5,
  hps: 10
}, {
  id: 2,
  name: 'BERSERKER!!!',
  speed: 25,
  pointsRatio: 2,
  hps: 5
}]