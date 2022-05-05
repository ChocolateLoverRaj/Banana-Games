import { Spin } from 'antd'
import { FC, ReactNode, RefObject } from 'react'
import ErrorResult from '../../ErrorResult'
import PromiseState from '../../types/PromiseState'
import Size from '../types/Size'
import useEmitters from '../useEmitters'
import { LoadedGame } from './loadedGame'
import useGameSettings from './useGameSettings'
import { UseGameWithSettingsResult } from './useGameWithSettings'

export interface BaseGameProps {
  size: Size
  children: ReactNode
  containerRef: RefObject<HTMLDivElement>
  game: UseGameWithSettingsResult
}

const BaseGame: FC<BaseGameProps> = props => {
  const loadSettingsPromise = useGameSettings()

  useEmitters([loadSettingsPromise.emitter])

  return (
    <>
      {loadSettingsPromise.state === PromiseState.RESOLVED
        ? (
          <LoadedGame
            {...props}
            allGameSettings={loadSettingsPromise.result}
          />)
        : loadSettingsPromise.state === PromiseState.PENDING
          ? <Spin tip='Loading Settings' size='large' />
          : <ErrorResult error={loadSettingsPromise.result} title='Error Loading Settings' />}
    </>
  )
}

export default BaseGame
