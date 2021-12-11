import MobxKeysPressed from '../MobxKeysPressed'
import BooleanGameSetting from './BooleanGameSetting'
import { makeObservable, computed } from 'mobx'

class MobxInputPressed {
  readonly keysPressed = new MobxKeysPressed()

  constructor (
    public booleanGameSetting: BooleanGameSetting
  ) {
    makeObservable(this, {
      pressed: computed
    })
  }

  get pressed (): boolean {
    return (
      this.booleanGameSetting.isTouchButtonPressed ||
      [...this.booleanGameSetting.keyBindings].some(key => this.keysPressed.keysPressed.has(key)))
  }
}

export default MobxInputPressed
