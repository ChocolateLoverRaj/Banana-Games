import Inputs from './types/Inputs'
import Input from './types/Input'

/**
 * Easily define actions and bind keys to them. You start with default key bindings, but then you
 * can also add a UI to customize the key bindings. You can easily check what keys are pressed
 * down.
 */
class ActionInputs<Action extends string = string> {
  currentInputs: Inputs<Action>

  constructor (readonly defaultInputs: Inputs<Action> = new Map<Action, Input>()) {
    this.currentInputs = defaultInputs
  }
}

export default ActionInputs
