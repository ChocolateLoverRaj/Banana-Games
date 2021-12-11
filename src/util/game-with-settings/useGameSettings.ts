import { useTransaction } from '../use-indexed-db'
import settingsDb from '../../settingsDb'
import usePromise from 'react-use-promise'
import PromiseState from '../../types/PromiseState'

export interface GameSettings {
  pausedWhenNotVisible: boolean
  touchScreen: boolean
}

export type UsePausedWhenNotVisibleResult = [GameSettings | undefined, Error | undefined, PromiseState]

const usePausedWhenNotVisible = (): UsePausedWhenNotVisibleResult => {
  const createTransaction = useTransaction(settingsDb)
  return usePromise<GameSettings>(async () => {
    const store = (await createTransaction(['settings'], 'readonly')).objectStore('settings')
    const [
      pausedWhenNotVisible,
      touchScreen
    ] = await Promise.all([
      store.get('pausedWhenNotVisible'),
      store.get('touchScreen')
    ])
    return {
      pausedWhenNotVisible,
      touchScreen
    }
  },
  [createTransaction])
}

export default usePausedWhenNotVisible
