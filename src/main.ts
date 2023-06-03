import { HtmlService } from './services/HtmlService'
import { Application } from 'pixi.js'
import { BASE } from './configs/base'

const htmlService = new HtmlService()

const app = new Application<HTMLCanvasElement>({ 
  width: BASE.screenWidth,
  height: BASE.screenHeight,
  antialias: true,
  resolution: 1,
  backgroundAlpha: 0.1
})

document.body.appendChild(app.view);

htmlService.htmlInit(app)