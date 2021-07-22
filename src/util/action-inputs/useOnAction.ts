import ActionInputs from './ActionInputs'
import useCurrentInputs from './useCurrentInputs'
import { useEffect } from 'react'
import { Set } from 'immutable'
import TouchButtons from './TouchButtons'

export type OnAction = () => void

const useOnAction = <Action extends string = string>(
  actionKeys: ActionInputs<Action>,
  touchButtons: TouchButtons<Action> | undefined,
  action: Action,
  onAction: OnAction
): void => {
  const [currentKeys] = useCurrentInputs(actionKeys)
  const keys = currentKeys.get(action)?.keyboard as Set<string>

  useEffect(() => {
    const handler = (e: KeyboardEvent): void => {
      if (keys.has(e.code)) onAction()
    }
    addEventListener('keydown', handler)
    return () => removeEventListener('keydown', handler)
  }, [keys, onAction])

  useEffect(() => {
    const handler = (clickedAction: Action): void => {
      if (clickedAction === action) onAction()
    }
    touchButtons?.clickEmitter.on(handler)
    return () => {
      touchButtons?.clickEmitter.off(handler)
    }
  }, [touchButtons])
}

export default useOnAction
