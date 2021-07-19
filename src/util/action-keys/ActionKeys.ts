import EventEmitter from 'single-event-emitter'
import Keys from './types/Keys'

/**
 * Easily define actions and bind keys to them. You start with default key bindings, but then you
 * can also add a UI to customize the key bindings. You can easily check what keys are pressed
 * down.
 */
class ActionKeys<Action extends string = string> extends EventEmitter {
  private _currentKeys: Keys<Action>

  constructor (readonly defaultKeys: Keys<Action>) {
    super()
    this._currentKeys = defaultKeys
  }

  get currentKeys (): Keys<Action> {
    return this._currentKeys
  }

  set currentKeys (keys) {
    if (keys !== this._currentKeys) {
      this._currentKeys = keys
      this.emit()
    }
  }
}

export default ActionKeys
