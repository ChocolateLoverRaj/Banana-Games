import { RefObject } from 'react'
import { Screen } from '../../util/game-with-settings'

interface IGameContext {
  gameRef: RefObject<HTMLDivElement>
  screen: Screen
}

export default IGameContext
