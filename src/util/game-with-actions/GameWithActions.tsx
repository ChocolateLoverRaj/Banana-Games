import { FC, ReactNode } from 'react'
import { Spin } from 'antd'
import { ActionInputs } from '../../util/action-inputs'
import TouchButtons from '../action-inputs/TouchButtons'
import Size from '../types/Size'
import { UseScreenResult } from './useScreen'
import { useTransaction } from '../use-indexed-db'
import settingsDb from '../../settingsDb'
import usePromise from 'react-use-promise'
import never from 'never'
import LoadedGame from './LoadedGame'
import ErrorResult from '../../ErrorResult'

export interface GameWithActionsProps<Action extends string = string> {
  actionInputs: ActionInputs<Action>
  touchButtons: TouchButtons<Action>
  back: Action
  children: ReactNode
  size: Size
  useScreenResult: UseScreenResult
}

const GameWithActions: FC<GameWithActionsProps> = <Action extends string = string>(
  props: GameWithActionsProps<Action>
) => {
  const createTransaction = useTransaction(settingsDb)
  const [pausedWhenNotVisible, error] = usePromise<boolean>(async () => await
  (await createTransaction(['settings'], 'readonly')).objectStore('settings')
    .get?.('pausedWhenNotVisible') ?? never('No value for key pausedWhenNotVisible'),
  [createTransaction])

  return (
    <>
      {pausedWhenNotVisible !== undefined
        ? <LoadedGame {...props} {...{ pausedWhenNotVisible }} />
        : error === undefined
          ? <Spin tip='Loading Settings' size='large' />
          : <ErrorResult error={error} title='Error Loading Settings' />}
    </>
  )
}

export default GameWithActions
