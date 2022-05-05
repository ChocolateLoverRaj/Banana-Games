import { FC } from 'react'
import ColumnProps from './ColumnProps'
import useReactionComputed from '../../Reaction2/UseReactionComputed/useReactionComputed'
import getObserveLoadedSetting from './getObserveLoadedSetting'
import useAutoSave from './useAutoSave'

const EditColumn: FC<ColumnProps> = props => {
  const { keyValue: [gameSettingDataAndAllFns, referenceManager] } = props
  const { fns: { coreFns: { renderEdit } } } = gameSettingDataAndAllFns
  const loadedSetting = useReactionComputed(getObserveLoadedSetting, referenceManager)
  useAutoSave(gameSettingDataAndAllFns)

  return (
    <>
      {renderEdit(loadedSetting)}
    </>

  )
}

export default EditColumn
