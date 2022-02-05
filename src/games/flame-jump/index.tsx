import GameComponent from '../../types/GameComponent'
import { forwardRef } from 'react'
import Description from './Description'
import PlayingGame from './PlayingGame'

export const Game: GameComponent = forwardRef((_props, ref) => {
  return (
    <>
      {navigator?.mediaDevices?.getUserMedia !== undefined
        ? <PlayingGame ref={ref} />
        : 'Your browser cannot give this page camera access'}
    </>
  )
})

export const description = <Description />
