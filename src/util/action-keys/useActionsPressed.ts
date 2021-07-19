import useKeysPressed from '../useKeysPressed'
import ActionKeys from './ActionKeys'
import useCurrentKeys from './useCurrentKeys'

const useActionsPressed = <Action extends string = string>(actionKeys: ActionKeys<Action>): Action[] => {
  const keysPressed = useKeysPressed()
  const [currentKeys] = useCurrentKeys(actionKeys)

  return [...currentKeys]
    .filter(([, keys]) => keys.some(key => keysPressed.has(key)))
    .map(([action]) => action)
}

export default useActionsPressed
