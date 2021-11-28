import { Emitter } from './emitter'

class MousePositionTracker extends Emitter<[]> {
  e: MouseEvent

  readonly listener = (e: MouseEvent): void => {
    this.e = e
    this.emit()
  }

  constructor (readonly element: HTMLElement | Window = window) {
    super()
  }

  start (): void {
    this.element.addEventListener('mousemove', this.listener)
  }

  stop (): void {
    this.element.removeEventListener('mousemove', this.listener)
  }
}

export default MousePositionTracker
