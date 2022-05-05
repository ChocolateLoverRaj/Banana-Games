import pauseSettingData from './pauseSettingData'
import { allFns } from './util/booleanGameSettings'
import { GameSettingDataAndAllFns } from './util/gameSetting'

const pauseSettingDataAndAllFns: Omit<GameSettingDataAndAllFns, 'id'> = {
  defaultData: pauseSettingData,
  fns: allFns
}

export default pauseSettingDataAndAllFns
