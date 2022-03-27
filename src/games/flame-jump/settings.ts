
import {
  booleanGameSettingFns,
  Context as BooleanContext,
  Data as BooleanData
} from '../../util/booleanGameSettings'
import pauseSettingData from '../../pauseSettingData'
import { GameSetting } from '../../util/gameSetting'
import pauseContext from './pauseContext'
import { Data, fns as cameraFns } from '../../util/cameraGameSetting'
import cameraSettingData from './cameraSetting'
import modelTypeSetting from './modelTypeSetting'

const pauseGameSetting: GameSetting<BooleanData, BooleanContext> = {
  data: pauseSettingData,
  fns: booleanGameSettingFns,
  context: pauseContext
}
const cameraSetting: GameSetting<Data, undefined> = {
  data: cameraSettingData,
  context: undefined,
  fns: cameraFns
}
const settings = [
  pauseGameSetting,
  cameraSetting,
  modelTypeSetting
] as const

export default settings
