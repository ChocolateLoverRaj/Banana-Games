import GameSettingDataAndAllFns from './gameSetting/GameSettingDataAndAllFns'

const getDbKey = (idPrefix: string, setting: GameSettingDataAndAllFns): string =>
  `${idPrefix}-${setting.id}`

export default getDbKey
