import SingleEventEmitter from 'single-event-emitter'
import ActionInputs from './ActionInputs'
import { Set } from 'immutable'

class TouchButtons<Action extends string = string> {
  private _buttonsPressed = Set<Action>()
  pressEmitter = new SingleEventEmitter()
  clickEmitter = new SingleEventEmitter()

  constructor (public readonly actionInputs: ActionInputs<Action>) {}

  get buttonsPressed (): Set<Action> {
    return this._buttonsPressed
  }

  set buttonsPressed (buttonsPressed) {
    if (buttonsPressed !== this._buttonsPressed) {
      this._buttonsPressed = buttonsPressed
      this.pressEmitter.emit()
    }
  }
}

export default TouchButtons
