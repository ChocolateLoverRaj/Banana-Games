import usePromise from 'react-use-promise'
import PromiseState from '../../types/PromiseState'
import settingsDexie from '../../settingsDexie'

export interface GameSettings {
  pausedWhenNotVisible: boolean
  touchScreen: boolean
}

export type UsePausedWhenNotVisibleResult =
  [GameSettings | undefined, Error | undefined, PromiseState]

const usePausedWhenNotVisible = (): UsePausedWhenNotVisibleResult => {
  return usePromise<GameSettings>(async () => {
    const settingsPromise = Promise.all([
      settingsDexie.pausedWhenNotVisible.get('') as Promise<boolean>,
      settingsDexie.touchScreen.get('') as Promise<boolean>
    ])
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
