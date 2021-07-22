import ActionInputs from './ActionInputs'
import Inputs from './types/Inputs'
import { Dispatch, useCallback, useEffect } from 'react'
import useUnique from '../useUnique'

export type UseCurrentInputsResult<Action extends string = string> = [Inputs<Action>, Dispatch<Inputs<Action>>]

const useCurrentInputs = <Action extends string = string>(
  actionKeys: ActionInputs<Action>
): UseCurrentInputsResult<Action> => {
  const reRender = useUnique()[1]

  useEffect(() => {
    actionKeys.on(reRender)
    return () => {
      actionKeys.off(reRender)
    }
  }, [reRender, actionKeys])

  const setCurrentInputs = useCallback<Dispatch<Inputs<Action>>>(keys => {
    actionKeys.currentInputs = keys
  }, [actionKeys])

  return [actionKeys.currentInputs, setCurrentInputs]
}

export default useCurrentInputs
