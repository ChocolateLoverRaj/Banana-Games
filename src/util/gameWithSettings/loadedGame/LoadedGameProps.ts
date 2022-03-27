import { BaseGameProps } from '../BaseGame'
import { GameSettings as AllGameSettings } from '../useGameSettings'

interface LoadedGameProps extends BaseGameProps {
  allGameSettings: AllGameSettings
}

export default LoadedGameProps
