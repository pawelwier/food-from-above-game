import { Application } from 'pixi.js'
import { keyboard } from './keyboard'
import { Game } from './game/Game';
import { Character } from './objects/Character';
import { GameOptions } from './game/GameOptions';
import { IDLE_FRAMES_COUNT, checkCollision, idleFrames } from './utils'
import { DifficultyLevel } from './types/DifficultyLevel'
import { byId } from './utils/htmlUtils';
import { Diet } from './types/Diet';

export const startGame = ({ difficulty, diet }: {difficulty: DifficultyLevel, diet: Diet}) => {

  const { hps, speed, pointsRatio } = difficulty
  
  const options = new GameOptions(600, 400, speed, hps, pointsRatio)
  const game = new Game(options)
  const { charHps, charSpeed, width, height } = options
  
  const app = new Application<HTMLCanvasElement>({ 
    width: width,
    height: height,
    antialias: true,
    resolution: 1,
    backgroundAlpha: 0.1
  })
  
  document.body.appendChild(app.view);
  
  const CHAR_WIDTH = 50
  const CHAR_HEIGHT = 70
  const INIT_POSITION = [app.screen.width / 2 - CHAR_WIDTH  / 2, app.screen.height - CHAR_HEIGHT]
  
  const catcher = new Character(CHAR_WIDTH, CHAR_HEIGHT, INIT_POSITION[0], INIT_POSITION[1], idleFrames, charSpeed, charHps)
  
  let elapsed = 0.0
  let itemInterval = 0.0
  
  const left = keyboard("ArrowLeft")
  const right = keyboard("ArrowRight")
  
  right.press = () => {  
    catcher.moveX(catcher.coordinates.x + charSpeed, width)
  }
  
  left.press = () => {  
    catcher.moveX(catcher.coordinates.x - charSpeed, width)
  }
  
  let prevCharPosition: number = catcher.coordinates.x
  
  app.ticker.add(delta => {
  
    catcher.getSpriteset(prevCharPosition)
  
    elapsed += delta
    itemInterval += delta
  
    if (itemInterval > 180 /* 3 seconds, TODO: make dynamic */) {
      game.addFoodItem(diet)
      itemInterval = 0.0
    }
  
    if (elapsed > 3) {
      const nextFrame = catcher.frame + 1
      catcher.frame = nextFrame < IDLE_FRAMES_COUNT ? nextFrame : 0 // TODO: move to function
      catcher.setTexture()
      elapsed = 0.0
  
      app.stage.addChild(catcher.sprite);
  
      game.foodItems.forEach(item => {
        item.coordinates.y += speed
        item.setTexture()
        app.stage.addChild(item.sprite)
  
        const itemCaught = checkCollision({catcher, item})
  
        if (itemCaught || item.coordinates.y > game.options.height - item.sprite.height) {
            app.stage.removeChild(item.sprite)
            game.removeItem(item)
            if (itemCaught) {
              game.addToScore(10)
              byId('points').innerText = String(game.score)
            } else {
              catcher.removeHp()
              byId('hps').innerText = String(catcher.hps)
            }
          }
      })
  
      prevCharPosition = catcher.coordinates.x
    }
  });
  
  }