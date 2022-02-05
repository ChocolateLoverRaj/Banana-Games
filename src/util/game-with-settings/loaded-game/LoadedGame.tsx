import { FC } from 'react'
import LoadedGamePauseable from './LoadedGamePauseable'
import { GameSettings as AllGameSettings } from '../useGameSettings'
import { BaseGameProps } from '../BaseGame'

export interface LoadedGameProps extends BaseGameProps {
  allGameSettings: AllGameSettings
}

const LoadedGame: FC<LoadedGameProps> = ({
  children,
  size,
  allGameSettings: gameSettings,
  screen,
  settings,
  containerRef
}) => {
  return (
    <>
      {screen !== undefined
        ? (
          <LoadedGamePauseable
            {...{ settings, allGameSettings: gameSettings, size, screen, containerRef }}
          >
            {children}
          </LoadedGamePauseable>)
        : children}
    </>
  )
}

export default LoadedGame
