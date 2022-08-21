import GameComponent from './GameComponent'
import { ReactNode } from 'react'
import GameMeta from './GameMeta'

interface GameExports {
  Game: GameComponent
  description: ReactNode
  meta: GameMeta
}

export default GameExports
