import { Rect } from '@khanonjs/engine'

let sceneRatio: number

export const START_RATIO_CANVAS = 0.45
export const MIDDLE_RATIO_CANVAS = 2.186
export const END_RATIO_CANVAS = 3.5
export const VERTICAL_RATIO_CANVAS = 0.31

export function updateRatio(canvasRect: Rect) {
  const factor = 1 / (MIDDLE_RATIO_CANVAS - START_RATIO_CANVAS)
  sceneRatio = (canvasRect.width / canvasRect.height - START_RATIO_CANVAS) * factor
}

export function getRatio() {
  return sceneRatio
}
