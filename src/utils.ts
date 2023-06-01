import { Resource, Texture } from "pixi.js"
import { Character } from "./objects/Character"
import { FoodItem } from "./objects/FoodItem"

export const IDLE_FRAMES_COUNT = 4
export const LEFT_FRAMES_COUNT = 5
export const RIGHT_FRAMES_COUNT = 5

export const idleFrames: Texture<Resource>[] = Array.from({length: IDLE_FRAMES_COUNT}, (_, i) => Texture.from(`character/char_idle_${i}.png`))
export const leftFrames: Texture<Resource>[] = Array.from({length: LEFT_FRAMES_COUNT}, (_, i) => Texture.from(`character/char_run_left_${i}.png`))
export const rightFrames: Texture<Resource>[] = Array.from({length: RIGHT_FRAMES_COUNT}, (_, i) => Texture.from(`character/char_run_right_${i}.png`))

export const getRandom = ({ min = 0, max }) => Math.floor(Math.random() * (max + 1 - min) + min)

export const checkCollision = // TODO: set collision rectangle
  ({ catcher, item }: { catcher: Character, item: FoodItem }) => (
   item.sprite.y + item.sprite.height > catcher.coordinates.y
    && item.sprite.x < catcher.coordinates.x + catcher.size.width 
    && item.sprite.x + item.sprite.width > catcher.coordinates.x)
