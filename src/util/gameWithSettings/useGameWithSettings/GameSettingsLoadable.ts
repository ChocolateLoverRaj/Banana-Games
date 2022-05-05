import { GameSettingDataAndAllFns } from '../../gameSetting'
import { ReferenceManager } from '../../ReferenceManager'
import LoadedSetting from './LoadedSetting'
import { ObservablePromise } from '../../ObservablePromise'

type GameSettingsLoadable = Map<
GameSettingDataAndAllFns,
ReferenceManager<ObservablePromise<LoadedSetting>>>

export default GameSettingsLoadable
