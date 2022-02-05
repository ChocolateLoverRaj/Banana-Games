
import {
  booleanGameSettingFns,
  Context as BooleanContext,
  Data as BooleanData
} from '../../util/boolean-game-settings'
import pauseSettingData from '../../pauseSettingData'
import { GameSetting } from '../../util/game-setting'
import pauseContext from './pauseContext'
import { Data, fns as cameraFns } from '../../util/camera-game-setting'
import cameraSettingData from './cameraSetting'

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
  cameraSetting
] as const

export default settings
