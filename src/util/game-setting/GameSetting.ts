import GameSettingFns from './GameSettingFns'

interface GameSetting<Data, Context> {
  data: Data
  fns: GameSettingFns<Data, Context>
  context: Context
}

export default GameSetting
