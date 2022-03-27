import { RefObject } from 'react'
import { Screen } from '../../util/gameWithSettings'

interface IGameContext {
  gameRef: RefObject<HTMLDivElement>
  screen: Screen
}

export default IGameContext
