import { Application } from 'pixi.js'
import { Game } from './game/Game';
import { Character } from './objects/Character';
import { GameOptions } from './game/GameOptions';
import { DifficultyLevel } from './interfaces/DifficultyLevel'
import { Diet } from './interfaces/Diet';
import { BASE } from './configs/base';
import { HtmlService } from './services/HtmlService';
import { GameState } from './enum/GameState';

export const startGame = ({ app, difficulty, diet }: { app: Application, difficulty: DifficultyLevel, diet: Diet }): void => {
  const htmlService = new HtmlService()
  const { hps, speed, pointsRatio } = difficulty
  const options = new GameOptions(BASE.screenWidth, BASE.screenHeight, speed, hps, pointsRatio, BASE.itemInterval)
  const catcher = new Character(options)
  const game = new Game(options, catcher, htmlService, difficulty, diet)

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
  
    if (elapsed > 3) {
      game.catcher.setTexture()
      elapsed = 0.0
  
      app.stage.addChild(game.catcher.sprite);

      game.foodItems.forEach(item => {
        item.setSpriteLocation(game.options.itemSpeed)
        app.stage.addChild(item.sprite)
  
        const caught = game.checkCollision(item)
  
        if (caught || game.itemLost(item)) {
            app.stage.removeChild(item.sprite)
            game.removeItem({ item, caught })
            if (caught) {
              htmlService.byId('points').innerText = String(game.score)
              htmlService.byId('level').innerText = String(game.level)
            } else {
              game.subtractCatcherHp()
              htmlService.updateCatcherHps(game.catcher.hps)
            }
          }
      })
  
      prevCharPosition = game.catcher.coordinates.x
    }
  });
}