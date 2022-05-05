import { GameSettingDataAndAllFns } from '../../gameSetting'
import { ObservablePromise } from '../../ObservablePromise'
import { ReferenceManager } from '../../ReferenceManager'
import { LoadedSetting } from '../useGameWithSettings'

interface ColumnProps {
  keyValue: [GameSettingDataAndAllFns, ReferenceManager<ObservablePromise<LoadedSetting>>]
}

export default ColumnProps
