import EventEmitter from 'single-event-emitter'
import Inputs from './types/Inputs'

/**
 * Easily define actions and bind keys to them. You start with default key bindings, but then you
 * can also add a UI to customize the key bindings. You can easily check what keys are pressed
 * down.
 */
class ActionInputs<Action extends string = string> extends EventEmitter {
  private _currentInputs: Inputs<Action>

  constructor (readonly defaultInputs: Inputs<Action>) {
    super()
    this._currentInputs = defaultInputs
  }

  get currentInputs (): Inputs<Action> {
    return this._currentInputs
  }

  set currentInputs (keys) {
    if (keys !== this._currentInputs) {
      this._currentInputs = keys
      this.emit()
    }
  }
}

export default ActionInputs
