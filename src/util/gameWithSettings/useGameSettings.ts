import { openDb } from '../indexedDb'
import usePromise from 'react-use-promise'
import PromiseState from '../../types/PromiseState'
import settingsDbOptions from '../../settingsDbOptions'

export interface GameSettings {
  pausedWhenNotVisible: boolean
  touchScreen: boolean
}

export type UsePausedWhenNotVisibleResult =
  [GameSettings | undefined, Error | undefined, PromiseState]

const usePausedWhenNotVisible = (): UsePausedWhenNotVisibleResult => {
  return usePromise<GameSettings>(async () => {
    const db = await openDb(settingsDbOptions)
    const store = db.transaction(['settings'], 'readonly').objectStore('settings')
    const settingsPromise = Promise.all([
      store.get('pausedWhenNotVisible'),
      store.get('touchScreen')
    ])
    db.close()
    const [
      pausedWhenNotVisible,
      touchScreen
    ] = await settingsPromise
    return {
      pausedWhenNotVisible,
      touchScreen
    }
  },
  [])
}

export default usePausedWhenNotVisible
