import { FC } from 'react'
import { LoadedGameProps } from '.'
import { Pauseable } from './Pauseable'

const LoadedGame: FC<LoadedGameProps> = ({
  children,
  size,
  allGameSettings: gameSettings,
  game,
  containerRef
}) => {
  return (
    <>
      {game.referencePauseEmitter !== undefined
        ? (
          <Pauseable
            {...{ game, size, containerRef }}
            allGameSettings={gameSettings}
          >
            {children}
          </Pauseable>)
        : children}
    </>
  )
}

export default LoadedGame
