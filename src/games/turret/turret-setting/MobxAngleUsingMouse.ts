import MobxMousePositionTracker from '../../../util/MobxMousePositionTracker'
import Position from '../../../util/types/Position'
import { makeObservable, computed } from 'mobx'

export type GetPosition = () => Position

class MobxAngleUsingMouse {
  readonly mousePosition = new MobxMousePositionTracker()

  constructor (readonly getPosition: GetPosition) {
    makeObservable(this, {
      angle: computed
    })
  }

  get angle (): number {
    if (this.mousePosition.e === undefined) return 0
    const { clientX, clientY } = this.mousePosition.e
    const { x, y } = this.getPosition()
    return Math.atan2(clientY - y, clientX - x)
  }
}

export default MobxAngleUsingMouse
