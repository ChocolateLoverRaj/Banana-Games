import useUnique from '../useUnique'
import TouchButtons from './TouchButtons'
import { Set } from 'immutable'
import { useEffect } from 'react'

const useButtonsPressed = <Action extends string = string>(
  touchButtons: TouchButtons<Action>
): Set<Action> => {
  const reRender = useUnique()[1]

  useEffect(() => {
    touchButtons.pressEmitter.on(reRender)
    return () => {
      touchButtons.pressEmitter.off(reRender)
    }
  }, [reRender])

  return touchButtons.buttonsPressed
}

export default useButtonsPressed
