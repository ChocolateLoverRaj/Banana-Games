import MobxKeysPressed from '../MobxKeysPressed'
import TouchButtons from './TouchButtons'
import { makeObservable, computed } from 'mobx'
import getActionsPressed from './getActionsPressed'

class MobxActionsPressed<Action extends string> {
  readonly keysPressed = new MobxKeysPressed()

  constructor (
    private readonly touchButtons: TouchButtons<Action>
  ) {
    makeObservable(this, {
      actionsPressed: computed
    })
  }

  get actionsPressed (): Set<Action> {
    return getActionsPressed(this.touchButtons, this.keysPressed.keysPressed)
  }
}

export default MobxActionsPressed
