import { Spin } from 'antd'
import { FC, ReactNode } from 'react'
import ErrorResult from '../../ErrorResult'
import { GameSetting } from '../game-setting'
import PauseEmitter from '../PauseEmitter'
import Size from '../types/Size'
import LoadedGame from './loaded-game'
import useGameSettings from './useGameSettings'
import { UseScreenResult } from './useScreen'

export interface BaseGameProps {
  size: Size
  children: ReactNode
  useScreenResult?: UseScreenResult
  pauseEmitter?: PauseEmitter
  settings: GameSetting[]
}

const BaseGame: FC<BaseGameProps> = props => {
  const { size, children, useScreenResult, pauseEmitter, settings } = props

  const [gameSettings, error] = useGameSettings()

  return (
    <>
      {gameSettings !== undefined
        ? (
          <LoadedGame {...{ pauseEmitter, settings, gameSettings, size, useScreenResult }}>
            {children}
          </LoadedGame>)
        : error === undefined
          ? <Spin tip='Loading Settings' size='large' />
          : <ErrorResult error={error} title='Error Loading Settings' />}
    </>
  )
}

export default BaseGame
