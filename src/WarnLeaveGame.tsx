import { FC } from 'react'
import { openDb } from './util/indexed-db'
import { useBeforeunload } from 'react-beforeunload'
import usePromise from 'react-use-promise'
import { Prompt } from 'react-router-dom'
import settingsDbOptions from './settingsDbOptions'

const message = 'Are you sure you want to exit the game?'

const WarnLeaveGame: FC = () => {
  const [warnBeforeLeavingGame] = usePromise<boolean>(async () => {
    const db = (await openDb(settingsDbOptions))
    const settingPromise = db.transaction(['settings'], 'readonly').objectStore('settings')
      .get('warnBeforeLeavingGame')
    db.close()
    return await settingPromise
  }, [])

  useBeforeunload(() => warnBeforeLeavingGame === true ? message : undefined)

  return (
    <>
      {warnBeforeLeavingGame === true && <Prompt message={message} />}
    </>
  )
}

export default WarnLeaveGame
