// import { Application, Sprite, Rectangle, AnimatedSprite, Texture, Loader } from 'pixi.js'
import {Application, AnimatedSprite, Texture, Sprite, Resource } from 'pixi.js'
import { keyboard } from './keyboard'
import { Game, GameOptions } from './game/game';
import { Character } from './character/character';

const game = new Game(600, 400)

const app = new Application<HTMLCanvasElement>({ 
  width: game.width,
  height: game.height,
  antialias: true,
  resolution: 1,
  backgroundAlpha: 0.1
})

document.body.appendChild(app.view);

const options = new GameOptions(10, 5)
const { charHps, charSpeed } = options

const IDLE_FRAMES_COUNT = 4
const CHAR_WIDTH = 50
const CHAR_HEIGHT = 70
const LEFT_FRAMES_COUNT = 5
const RIGHT_FRAMES_COUNT = 5
const INIT_POSITION = [app.screen.width / 2 - CHAR_WIDTH  / 2, app.screen.height - CHAR_HEIGHT]

const idleFrames: Texture<Resource>[] = []
const rightFrames: Texture<Resource>[] = []
const leftFrames: Texture<Resource>[] = []

for (let i = 0; i < IDLE_FRAMES_COUNT; i++) {
  idleFrames.push(Texture.from(`character/char_idle_${i}.png`));
}

for (let i = 0; i < RIGHT_FRAMES_COUNT; i++) {
  rightFrames.push(Texture.from(`character/char_run_right_${i}.png`));
}

for (let i = 0; i < LEFT_FRAMES_COUNT; i++) {
  leftFrames.push(Texture.from(`character/char_run_left_${i}.png`));
}

const catcher = new Character(CHAR_WIDTH, CHAR_HEIGHT, INIT_POSITION[0], INIT_POSITION[1], idleFrames, charSpeed, charHps)

const apple = new Sprite(Texture.from('food/Apple.png'))

apple.x = 60
apple.y = 0

let elapsed = 0.0

const left = keyboard("ArrowLeft")
const right = keyboard("ArrowRight")

right.press = () => {  
  catcher.moveX(catcher.coordinates.x + charSpeed, game.width)
}

left.press = () => {  
  catcher.moveX(catcher.coordinates.x - charSpeed, game.width)
}

let prevCharPosition = catcher.coordinates.x

app.ticker.add(delta => {

  if (catcher.coordinates.x > prevCharPosition) {
    catcher.frames = rightFrames
  }

  else if (catcher.coordinates.x < prevCharPosition) {
    catcher.frames = leftFrames
  }
  else {
    catcher.frames = idleFrames
  }

  elapsed += delta

  if (elapsed > 4) {
    apple.y += 5
    const nextFrame = catcher.frame + 1
    catcher.frame = nextFrame < IDLE_FRAMES_COUNT ? nextFrame : 0
    catcher.setTexture()
    elapsed = 0.0

    app.stage.addChild(catcher.sprite);
    app.stage.addChild(apple);

    if (apple.y + apple.height > catcher.coordinates.y 
      && apple.x < catcher.coordinates.x + catcher.size[0] / 2 
      && apple.x + apple.width > catcher.coordinates.x
    ) {
        console.log('collision!')
      }
      prevCharPosition = catcher.coordinates.x
  }
});
