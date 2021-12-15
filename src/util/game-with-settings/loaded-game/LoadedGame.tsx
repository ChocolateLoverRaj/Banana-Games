import { FC, ReactNode, RefObject } from 'react'
import Size from '../../types/Size'
import LoadedGamePauseable from './LoadedGamePauseable'
import { GameSettings } from '../useGameSettings'
import { UseScreenResult } from '../useScreen'
import { GameSetting } from '../../game-setting'
import PauseEmitter from '../../PauseEmitter'

export interface LoadedGameProps {
  gameSettings: GameSettings
  size: Size
  children: ReactNode
  useScreenResult?: UseScreenResult
  settings: GameSetting[]
  pauseEmitter?: PauseEmitter
  containerRef: RefObject<HTMLDivElement>
}

const LoadedGame: FC<LoadedGameProps> = ({
  children,
  size,
  gameSettings,
  useScreenResult,
  pauseEmitter,
  settings,
  containerRef
}) => {
  return (
    <>
      {pauseEmitter !== undefined
        ? (
          <LoadedGamePauseable
            {...{ settings, pauseEmitter, gameSettings, size, useScreenResult, containerRef }}
          >
            {children}
          </LoadedGamePauseable>)
        : children}
    </>
  )
}

export default LoadedGame
