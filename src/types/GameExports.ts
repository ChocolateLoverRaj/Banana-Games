import GameComponent from './GameComponent'
import { ReactNode } from 'react'
import Input from '../games/game-settings/gameWithSettings/useGameSettings/Input'

interface GameExports {
  Game: GameComponent
  description: ReactNode
  settings?: Input
}

export default GameExports
