import { Game } from './game/Game'
import { Character } from './objects/Character'
import { GameOptions } from './game/GameOptions'
import { type DifficultyLevel } from './interfaces/DifficultyLevel'
import { type Diet } from './interfaces/Diet'
import { BASE } from './configs/base'
import { HtmlService } from './services/HtmlService'
import { GameState } from './enum/GameState'

export const startGame = async ({ difficulty, diet }: { difficulty: DifficultyLevel, diet: Diet }): Promise<void> => {
  const htmlService = new HtmlService()

  const app = htmlService.renderApp()

  const { hps, speed, pointsRatio } = difficulty
  const options = new GameOptions(BASE.screenWidth, BASE.screenHeight, speed, hps, pointsRatio)
  const catcher = new Character(options)
  const game = new Game(options, catcher, htmlService, difficulty, diet)

  await game.loadBaseTexture()

  htmlService.onGameStart(game)

  let elapsed = 0.0
  let itemInterval = 0.0
  let prevCharPosition: number = game.catcher.coordinates.x

  app.ticker.add(delta => {
    if (game.isState(GameState.over)) {
      app.ticker.stop()
      return
    }

    game.listenToKeyEvents()

    game.catcher.getSpriteset(prevCharPosition)

    elapsed += delta
    itemInterval += delta

    if (itemInterval > game.options.itemInterval) {
      game.addFoodItem(diet)
      itemInterval = 0.0
    }

    if (elapsed > BASE.frameInterval) {
      game.catcher.setTexture()
      elapsed = 0.0

      app.stage.addChild(game.catcher.sprite)

      game.foodItems.forEach(item => {
        item.setSpriteLocation(game.options.itemSpeed)
        app.stage.addChild(item.sprite)

        const caught = game.checkCollision(item)

        if (caught || game.itemLost(item)) {
          app.stage.removeChild(item.sprite)
          game.removeItem({ item, caught })
          game.handleItemOut(caught)
        }
      })

      prevCharPosition = game.catcher.coordinates.x
    }
  })
}
