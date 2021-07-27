import { useTransaction } from '../use-indexed-db'
import settingsDb from '../../settingsDb'
import usePromise from 'react-use-promise'
import never from 'never'
import PromiseState from '../../types/PromiseState'

export type UsePausedWhenNotVisibleResult = [boolean | undefined, Error | undefined, PromiseState]

const usePausedWhenNotVisible = (): UsePausedWhenNotVisibleResult => {
  const createTransaction = useTransaction(settingsDb)
  return usePromise<boolean>(async () => await
  (await createTransaction(['settings'], 'readonly')).objectStore('settings')
    .get?.('pausedWhenNotVisible') ?? never('No value for key pausedWhenNotVisible'),
  [createTransaction])
}

export default usePausedWhenNotVisible
