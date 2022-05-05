import { GameSettingsLoadable } from '.'
import Screen from '../Screen'
import ReferencePauseEmitter from './ReferencePauseEmitter'

interface UseGameWithSettingsResult {
  gameSettingsLoadable: GameSettingsLoadable
  screen: Screen
  referencePauseEmitter?: ReferencePauseEmitter
  idPrefix: string
}

export default UseGameWithSettingsResult
