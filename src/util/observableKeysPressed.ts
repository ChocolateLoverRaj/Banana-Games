import wrapGetObservable from 'observables/lib/wrapGetObservable/wrapGetObservable'
import createNormal from 'observables/lib/observableSet/createNormal'
import add from 'observables/lib/observableSet/add'
import remove from 'observables/lib/observableSet/remove'

const keysPressed = createNormal<string>()
const observableKeysPressed = wrapGetObservable({
  getValue: () => keysPressed,
  getInternalObserve: () => {
    const keydownListener = (e: KeyboardEvent): void => {
      if (e.repeat) return
      add({ data: keysPressed, value: e.code })
    }
    const keyupListener = (e: KeyboardEvent): void => {
      remove({ data: keysPressed, value: e.code })
    }
    return {
      add: () => {
        window.addEventListener('keydown', keydownListener)
        window.addEventListener('keyup', keyupListener)
      },
      remove: () => {
        window.removeEventListener('keydown', keydownListener)
        window.removeEventListener('keyup', keyupListener)
      }
    }
  }
})

export default observableKeysPressed
