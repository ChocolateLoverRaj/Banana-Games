import { createAtom, action, makeObservable, observable } from 'mobx'
import KeysPressed from './KeysPressed'

class MobxKeysPressed extends KeysPressed {
  onKeyDown (code: string): void {
    super.onKeyDown(code)
    this.atom.reportChanged()
  }

  onKeyUp (code: string): void {
    super.onKeyUp(code)
    this.atom.reportChanged()
  }

  private readonly atom = createAtom(
    MobxKeysPressed.name,
    () => {
      this.start()
    },
    () => {
      this.stop()
    })

  constructor () {
    super()
    makeObservable(this, {
      _keysPressed: observable,
      onKeyDown: action,
      onKeyUp: action
    })
  }

  get keysPressed (): ReadonlySet<string> {
    if (this.atom.reportObserved()) {
      return this._keysPressed
    } else {
      return new Set()
    }
  }
}

export default MobxKeysPressed
