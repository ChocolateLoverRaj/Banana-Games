import { initialize, Data, fns } from '../../util/selectGameSetting'
import { movenet } from '@tensorflow-models/pose-detection'
import { GameSetting } from '../../util/gameSetting'

type TModelType = typeof movenet['modelType']
type TData = TModelType[keyof TModelType]

const modelTypeSetting: GameSetting<Data<TData>, undefined> = {
  data: initialize<TData>(
    'Pose Detection Model Type',
    [{
      key: movenet.modelType.SINGLEPOSE_LIGHTNING
    }, {
      key: movenet.modelType.SINGLEPOSE_THUNDER
    }],
    movenet.modelType.SINGLEPOSE_LIGHTNING
  ),
  context: undefined,
  fns
}

export default modelTypeSetting
