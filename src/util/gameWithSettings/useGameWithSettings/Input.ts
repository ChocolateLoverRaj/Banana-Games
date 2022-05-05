import { GameSettingDataAndAllFns } from '../../gameSetting'

interface Input {
  settings: readonly GameSettingDataAndAllFns[]
  pauseSetting?: GameSettingDataAndAllFns
  idPrefix: string
}

export default Input
