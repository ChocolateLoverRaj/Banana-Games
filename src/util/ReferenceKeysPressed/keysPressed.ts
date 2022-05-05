import { ObservableSet } from '..'
import { create } from '../ReferenceManager'
import { KeysPressedData } from '.'

// TODO: Make this reference emitter?
const keysPressed = create<KeysPressedData>({
  load: () => {
    const keysPressed = ObservableSet.create(new Set<string>())
    const onKeyDown = ({ code }: KeyboardEvent): void => {
      ObservableSet.add(keysPressed, code)
    }
    const onKeyUp = ({ code }: KeyboardEvent): void => {
      ObservableSet.deleteValue(keysPressed, code)
    }

    addEventListener('keydown', onKeyDown)
    addEventListener('keyup', onKeyUp)

    return {
      keysPressed,
      onKeyDown,
      onKeyUp
    }
  },
  unload: ({ onKeyDown, onKeyUp }) => {
    removeEventListener('keydown', onKeyDown)
    removeEventListener('keyup', onKeyUp)
  }
})

export default keysPressed
