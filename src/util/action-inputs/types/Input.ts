import { Set } from 'immutable'
import TouchInput from './TouchInput'

interface Input {
  /**
   * Keys that are pressed
   */
  keyboard: Set<string>
  /**
   * Buttons that are pressed on screen
   */
  touch: TouchInput
}

export default Input
