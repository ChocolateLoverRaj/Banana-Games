import {
  booleanGameSettingFns,
  Context,
  Data,
  initializeData
} from '../../util/booleanGameSettings'
import { GameSetting } from '../../util/gameSetting'
import buttonSize from './buttonSize'
import defaultPauseSetting from '../../pauseSettingData'

const buttonMargin = 10
const pauseSetting: GameSetting<Data, Context> = {
  data: initializeData(
    defaultPauseSetting.name,
    defaultPauseSetting.defaultKeyBindings,
    defaultPauseSetting.buttonContent,
    [{
      x: {
        value: buttonMargin * 2 + buttonSize,
        reverse: true
      },
      y: {
        value: buttonMargin,
        reverse: false
      },
      width: buttonSize,
      height: buttonSize
    }]
  ),
  context: new Set(),
  fns: booleanGameSettingFns
}

export default pauseSetting
