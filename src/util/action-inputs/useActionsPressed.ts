import useKeysPressed from '../useKeysPressed'
import ActionInputs from './ActionInputs'
import TouchButtons from './TouchButtons'
import useButtonsPressed from './useButtonsPressed'
import useCurrentInputs from './useCurrentInputs'

const useActionsPressed = <Action extends string = string>(
  actionInputs: ActionInputs<Action>,
  touchButtons: TouchButtons<Action>
): Set<Action> => {
  const keysPressed = useKeysPressed()
  const [currentKeys] = useCurrentInputs(actionInputs)
  const buttonsPressed = useButtonsPressed(touchButtons)

  return new Set([...[...currentKeys]
    .filter(([, keys]) => keys.keyboard.some(key => keysPressed.has(key)))
    .map(([action]) => action), ...buttonsPressed])
}

export default useActionsPressed
