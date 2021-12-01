import Inputs from './types/Inputs'
import Input from './types/Input'
import deepClone from 'rfdc/default'
import { makeObservable, observable } from 'mobx'

/**
 * Easily define actions and bind keys to them. You start with default key bindings, but then you
 * can also add a UI to customize the key bindings. You can easily check what keys are pressed
 * down.
 */
class ActionInputs<Action extends string = string> {
  currentInputs: Inputs<Action>

  constructor (readonly defaultInputs: Inputs<Action> = new Map<Action, Input>()) {
    this.currentInputs = deepClone(defaultInputs)
    this.currentInputs.forEach(input => {
      makeObservable(input, {
        keyboard: observable
      })
    })
  }
}

export default ActionInputs
