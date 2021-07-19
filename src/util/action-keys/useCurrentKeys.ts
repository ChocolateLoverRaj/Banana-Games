import ActionKeys from './ActionKeys'
import Keys from './types/Keys'
import { Dispatch, useCallback, useEffect } from 'react'
import useUnique from '../useUnique'

export type UseCurrentKeysResult<Action extends string = string> = [Keys<Action>, Dispatch<Keys<Action>>]

const useCurrentKeys = <Action extends string = string>(
  actionKeys: ActionKeys<Action>
): UseCurrentKeysResult<Action> => {
  const reRender = useUnique()[1]

  useEffect(() => {
    actionKeys.on(reRender)
    return () => {
      actionKeys.off(reRender)
    }
  }, [reRender, actionKeys])

  const setCurrentKeys = useCallback<Dispatch<Keys<Action>>>(keys => {
    actionKeys.currentKeys = keys
  }, [actionKeys])

  return [actionKeys.currentKeys, setCurrentKeys]
}

export default useCurrentKeys
