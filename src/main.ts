// import { Application, Sprite, Rectangle, AnimatedSprite, Texture, Loader } from 'pixi.js'
import {Application, AnimatedSprite, Texture, Sprite, Resource } from 'pixi.js'
import { keyboard } from './keyboard'

const app = new Application<HTMLCanvasElement>({ 
  width: 600,
  height: 400,                       
  antialias: true,
  resolution: 1,
  backgroundAlpha: 0.1
})

document.body.appendChild(app.view);

const IDLE_FRAMES_COUNT = 4
const CHAR_SIZE = 84
const LEFT_FRAMES_COUNT = 6
const RIGHT_FRAMES_COUNT = 6
const INIT_POSITION = [app.screen.width / 2 - CHAR_SIZE  / 2, app.screen.height - CHAR_SIZE]

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

let catcher = new AnimatedSprite(idleFrames);
catcher.x = INIT_POSITION[0]
catcher.y = INIT_POSITION[1];
catcher.anchor.set(0.0);
catcher.animationSpeed = 0.15

const apple = new Sprite(Texture.from('food/Apple.png'))

apple.x = 60
apple.y = 0

let elapsed = 0.0

const left = keyboard("ArrowLeft")
const right = keyboard("ArrowRight")

right.press = () => {  
  catcher.x += 10
}

left.press = () => {  
  catcher.x -= 10
}

let prevCharPosition = catcher.x

app.ticker.add(delta => {


  if (catcher.x > prevCharPosition) {
    catcher.textures = rightFrames
  }

  else if (catcher.x < prevCharPosition) {
    catcher.textures = leftFrames
  }
  else {
    catcher.textures = idleFrames
  }

  elapsed += delta

  if (elapsed > 4) {
    apple.y += 5
    const nextFrame = catcher.currentFrame + 1
    // catcher.gotoAndPlay(nextFrame < IDLE_FRAMES_COUNT ? nextFrame : 0);
    catcher.texture = catcher.textures[nextFrame < IDLE_FRAMES_COUNT ? nextFrame : 0]
    prevCharPosition = catcher.x
    elapsed = 0.0

    app.stage.addChild(catcher);

    app.stage.addChild(apple);

    if (apple.y + apple.height > catcher.y && apple.x < catcher.x + catcher.width / 2 && apple.x + apple.width > catcher.x) 
    {
      console.log('collision!')
    }
  }
});
