import SingleEventEmitter from 'single-event-emitter'
import ActionInputs from './ActionInputs'
import { makeObservable, observable } from 'mobx'

class TouchButtons<Action extends string = string> {
  buttonsPressed = new Set<Action>()
  readonly pressEmitter = new SingleEventEmitter()
  readonly clickEmitter = new SingleEventEmitter<[Action]>()

  constructor (public readonly actionInputs: ActionInputs<Action>) {
    makeObservable(this, {
      buttonsPressed: observable
    })
  }
}

export default TouchButtons
