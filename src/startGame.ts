import { Application } from 'pixi.js'
import { Game } from './game/Game';
import { Character } from './objects/Character';
import { GameOptions } from './game/GameOptions';
import { IDLE_FRAMES_COUNT, checkCollision, idleFrames } from './utils'
import { DifficultyLevel } from './interfaces/DifficultyLevel'
import { Diet } from './interfaces/Diet';
import { BASE } from './configs/base';
import { HtmlService } from './services/HtmlService';

const htmlService = new HtmlService()

export const startGame = ({ difficulty, diet }: { difficulty: DifficultyLevel, diet: Diet }) => {

  const { hps, speed, pointsRatio } = difficulty
  
  const options = new GameOptions(BASE.screenWidth, BASE.screenHeight, speed, hps, pointsRatio)
  const { charHps, width, height } = options
  
  const app = new Application<HTMLCanvasElement>({ 
    width: width,
    height: height,
    antialias: true,
    resolution: 1,
    backgroundAlpha: 0.1
  })
  
  document.body.appendChild(app.view);

  // TODO: move out
  const keyPressed = {}
  window.addEventListener('keydown', (e: KeyboardEvent) => {
    keyPressed[e.code] = true
  })

  window.addEventListener('keyup', (e: KeyboardEvent) => {
    keyPressed[e.code] = false
  })
  
  const CHAR_WIDTH = 50
  const CHAR_HEIGHT = 70
  const INIT_POSITION = [app.screen.width / 2 - CHAR_WIDTH  / 2, app.screen.height - CHAR_HEIGHT]
  
  const catcher = new Character(CHAR_WIDTH, CHAR_HEIGHT, INIT_POSITION[0], INIT_POSITION[1], idleFrames, BASE.characterSpeed, charHps)
  
  const game = new Game(options, catcher, htmlService)

  let elapsed = 0.0
  let itemInterval = 0.0
  let prevCharPosition: number = game.catcher.coordinates.x
  
  app.ticker.add(delta => {

    if (keyPressed['ArrowRight']) { game.catcher.moveX(game.catcher.coordinates.x + game.catcher.speed, width) }
    if (keyPressed['ArrowLeft']) { game.catcher.moveX(game.catcher.coordinates.x - game.catcher.speed, width) }
  
    game.catcher.getSpriteset(prevCharPosition)
  
    elapsed += delta
    itemInterval += delta
  
    if (itemInterval > 180 /* 3 seconds, TODO: make dynamic */) {
      game.addFoodItem(diet)
      itemInterval = 0.0
    }
  
    if (elapsed > 3) {
      const nextFrame = game.catcher.frame + 1
      game.catcher.frame = nextFrame < IDLE_FRAMES_COUNT ? nextFrame : 0 // TODO: move to function
      game.catcher.setTexture()
      elapsed = 0.0
  
      app.stage.addChild(game.catcher.sprite);
  
      game.foodItems.forEach(item => {
        item.coordinates.y += game.options.itemSpeed
        item.setTexture()
        app.stage.addChild(item.sprite)
  
        const caught = checkCollision({catcher: game.catcher, item})
  
        // take second param as separate function
        if (caught || item.coordinates.y > game.options.height - item.sprite.height) {
            app.stage.removeChild(item.sprite)
            game.removeItem({ item, caught })
            if (caught) {
              htmlService.byId('points').innerText = String(game.score)
              htmlService.byId('level').innerText = String(game.level)
            } else {
              game.catcher.removeHp()
              htmlService.updateCatcherHps(game.catcher.hps)
            }
          }
      })
  
      prevCharPosition = game.catcher.coordinates.x
    }
  });
  
  }