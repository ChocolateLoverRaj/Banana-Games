import { FC } from 'react'
import settingsDb from './settingsDb'
import { useTransaction } from './util/use-indexed-db'
import { useBeforeunload } from 'react-beforeunload'
import usePromise from 'react-use-promise'
import { Prompt } from 'react-router-dom'

const message = 'Are you sure you want to exit the game?'

const WarnLeaveGame: FC = () => {
  const createTransaction = useTransaction(settingsDb)
  // TODO: Show loading
  const [warnBeforeLeavingGame] = usePromise<boolean>(async () =>
    await (await createTransaction(['settings'], 'readonly')).objectStore('settings')
      .get('warnBeforeLeavingGame'), [createTransaction])

  useBeforeunload(() => warnBeforeLeavingGame === true ? message : undefined)

  return (
    <>
      {warnBeforeLeavingGame === true && <Prompt message={message} />}
    </>
  )
}

export default WarnLeaveGame
