import ActionKeys from './ActionKeys'
import useCurrentKeys from './useCurrentKeys'
import { useEffect } from 'react'
import { Set } from 'immutable'

export type OnAction = () => void

const useOnAction = <Action extends string = string>(
  actionKeys: ActionKeys<Action>,
  action: Action,
  onAction: OnAction
): void => {
  const [currentKeys] = useCurrentKeys(actionKeys)
  const keys = currentKeys.get(action) as Set<string>

  useEffect(() => {
    const handler = (e: KeyboardEvent): void => {
      if (keys.has(e.code)) onAction()
    }
    addEventListener('keydown', handler)
    return () => removeEventListener('keydown', handler)
  }, [keys, onAction])
}

export default useOnAction
