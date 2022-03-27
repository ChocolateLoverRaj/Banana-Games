import { FC } from 'react'
import { LoadedGamePauseable, LoadedGameProps } from '.'

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
