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
  caughtItemCount: number
  totalItemCount: number
  canFlash: boolean

  addKeyListeners: () => void
  addFoodItem: (diet: Diet) => void
  addToScore: () => void
  onNewLevel: () => void
  checkNewLevel: (itemsCaught: number) => boolean
  checkAddHp: () => void
  onItemCaught: () => void
  onItemLost: () => void
  removeItem: ({ item, caught }: { item: FoodItem, caught: boolean }) => void
  subtractCatcherHp: () => void
  isState: (state: GameState) => boolean
  gameOver: () => void
  listenToKeyEvents: () => void
  checkCollision: (item: FoodItem) => boolean
  itemLost: (item: FoodItem) => boolean
  handleItemOut: (caught: boolean) => void
  loadBaseTexture: () => Promise<void>
}
