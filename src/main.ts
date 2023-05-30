import { Application, Sprite } from 'pixi.js'

const app = new Application({ 
  width: 600,
  height: 400,                       
  antialias: true, 
  transparent: true, 
  resolution: 1
}
);

document.body.appendChild(app.view);

const character: Sprite = Sprite.from('character/char_idle_0.png');

character.anchor.set(0.5);

character.x = app.screen.width / 2;
character.y = app.screen.height / 2;

app.stage.addChild(character);

app.ticker.add(delta => {
  console.log(delta)
  character.position.set(delta * 300, 30)
});