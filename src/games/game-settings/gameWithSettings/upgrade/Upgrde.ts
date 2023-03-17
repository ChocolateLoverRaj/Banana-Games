import GameSettingsData from '../GameSettingsData'
import Input from './Input'

type Upgrade = (input: Input) => Promise<GameSettingsData>

export default Upgrade
