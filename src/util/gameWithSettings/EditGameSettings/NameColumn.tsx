import { Skeleton } from 'antd'
import { FC } from 'react'
import ColumnProps from './ColumnProps'
import useReactionComputed from '../../Reaction2/UseReactionComputed/useReactionComputed'
import getObserveLoadedSetting from './getObserveLoadedSetting'

const NameColumn: FC<ColumnProps> = props => {
  const { keyValue: [{ fns: { coreFns: { getName } } }, referenceManager] } = props
  const loadedSetting = useReactionComputed(getObserveLoadedSetting, referenceManager, undefined)

  return (
    <>
      {loadedSetting !== undefined
        ? getName(loadedSetting)
        : <Skeleton paragraph={{ rows: 0 }} active />}
    </>

  )
}

export default NameColumn
