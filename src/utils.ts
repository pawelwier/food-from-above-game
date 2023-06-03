export const getRandom =
  ({ min = 0, max }: { min?: number, max: number }): number =>
    Math.floor(Math.random() * (max + 1 - min) + min)
