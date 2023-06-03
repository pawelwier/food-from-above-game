export interface GameInterface {
  state: GameState
  catcher: Character
  foodItems: FoodItem[]
  options: GameOptions
  score: number
  level: number
  caughtThisLevel: number
  itemsPerLevel: number
  htmlService: HtmlServiceInterface
  difficulty: DifficultyLevel
  diet: Diet

  addKeyListeners(): void
  addFoodItem(diet: Diet): void
  addToScore(): void
  checkNewLevel(): void
  checkAddHp(): void
  onItemCaught(): void
  removeItem({ item, caught }: { item: FoodItem, caught: boolean }): void
  subtractCatcherHp(): void
  isState(state: GameState): boolean
  gameOver(): void
  listenToKeyEvents(): void
  checkCollision(item: FoodItem): boolean
  itemLost(item: FoodItem): boolean
  caughtItemCount(): number
  handleItemOut(caught: boolean): void
}