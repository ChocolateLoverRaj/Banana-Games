import { GameSettingDataAndAllFns } from '../../gameSetting'
import ReferenceManagerMap from '../../ReferenceManager/Map/ReferenceManagerMap'
import AutoSaveReaction from './AutoSaveReaction'

type EditGameSettingsContextData = ReferenceManagerMap<GameSettingDataAndAllFns, AutoSaveReaction>

export default EditGameSettingsContextData
