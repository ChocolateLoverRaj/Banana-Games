import { useEffect } from 'react'
import ActionInputs from './ActionInputs'
import TouchButtons from './TouchButtons'

export type OnAction = () => void

const useOnAction = <Action extends string = string>(
  touchButtonsOrActionInputs: TouchButtons<Action> | ActionInputs<Action>,
  action: Action,
  onAction: OnAction
): void => {
  let touchButtons: TouchButtons<Action>
  let actionInputs: ActionInputs<Action>
  if ('actionInputs' in touchButtonsOrActionInputs) {
    touchButtons = touchButtonsOrActionInputs
    actionInputs = touchButtonsOrActionInputs.actionInputs
  } else {
    actionInputs = touchButtonsOrActionInputs
  }
  const keys = actionInputs.currentInputs.get(action)?.keyboard as Set<string>

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
  }, [touchButtonsOrActionInputs])
}

export default useOnAction
