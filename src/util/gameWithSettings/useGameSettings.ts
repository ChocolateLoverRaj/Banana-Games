import { openDb } from '../indexedDb'
import settingsDbOptions from '../../settingsDbOptions'
import { create, ObservablePromise } from '../ObservablePromise'
import useConstant from 'use-constant'

export interface GameSettings {
  pausedWhenNotVisible: boolean
  touchScreen: boolean
}

const usePausedWhenNotVisible = (): ObservablePromise<GameSettings> => {
  return useConstant(() => create((async () => {
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
  })()))
}

export default usePausedWhenNotVisible
