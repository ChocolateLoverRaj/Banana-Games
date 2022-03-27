import pauseSettingData from '../../pauseSettingData'
import { booleanGameSettingFns, Context, Data } from '../../util/booleanGameSettings'
import { GameSetting } from '../../util/gameSetting'

const pauseSetting: GameSetting<Data, Context> = {
  data: pauseSettingData,
  context: new Set(),
  fns: booleanGameSettingFns
}

export default pauseSetting
