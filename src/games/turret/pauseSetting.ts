import pauseSettingData from '../../pauseSettingData'
import { booleanGameSettingFns, Context, Data } from '../../util/boolean-game-settings'
import { GameSetting } from '../../util/game-setting'

const pauseSetting: GameSetting<Data, Context> = {
  data: pauseSettingData,
  context: new Set(),
  fns: booleanGameSettingFns
}

export default pauseSetting
