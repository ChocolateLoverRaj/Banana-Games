import Element from './Element'
import MouseEventHandler from './MouseEventHandler'

interface Data {
  e?: MouseEvent
  element: Element
  handler: MouseEventHandler
}

export default Data
