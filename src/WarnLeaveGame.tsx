import { FC } from 'react'
import { useBeforeunload } from 'react-beforeunload'
// import { Prompt } from 'react-router-dom'
import settingsDexie from './settingsDexie'
import { useLiveQuery } from 'dexie-react-hooks'

const message = 'Are you sure you want to exit the game?'

const WarnLeaveGame: FC = () => {
  const warnBeforeLeavingGame = useLiveQuery(async () =>
    await settingsDexie.warnBeforeLeavingGame.get(''), [])

  useBeforeunload(() => warnBeforeLeavingGame === true ? message : undefined)

  return (
    <>
      {warnBeforeLeavingGame === true/*  && <Prompt message={message} /> */}
    </>
  )
}

export default WarnLeaveGame
