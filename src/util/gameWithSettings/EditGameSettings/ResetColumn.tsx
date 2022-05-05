import { Skeleton } from 'antd'
import { FC } from 'react'
import ColumnProps from './ColumnProps'
import useReactionComputed from '../../Reaction2/UseReactionComputed/useReactionComputed'
import getObserveLoadedSetting from './getObserveLoadedSetting'
import ResetButton from '../ResetButton'
import useAutoSave from './useAutoSave'

const ResetColumn: FC<ColumnProps> = props => {
  const { keyValue: [gameSettingDataAndAllFns, referenceManager] } = props
  const { fns: { coreFns, coreFns: { reset } } } = gameSettingDataAndAllFns
  const loadedSetting = useReactionComputed(getObserveLoadedSetting, referenceManager, undefined)
  useAutoSave(gameSettingDataAndAllFns)

  return (
    <>
      {reset !== undefined
        ? loadedSetting !== undefined
          ? <ResetButton setting={{ ...loadedSetting, fns: coreFns }} />
          : <Skeleton.Button active />
        : undefined}
    </>

  )
}

export default ResetColumn
