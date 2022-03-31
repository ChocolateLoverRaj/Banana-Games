import pauseSettingData from './pauseSettingData'
import { allFns } from './util/booleanGameSettings'
import { GameSettingDataAndAllFns } from './util/gameSetting'

const pauseSettingDataAndAllFns: GameSettingDataAndAllFns = {
  data: pauseSettingData,
  fns: allFns
}

export default pauseSettingDataAndAllFns
