import { Select } from 'antd'
import { FC } from 'react'
import playerInputPresetNames from '../../../playerInputPresetNames'
import Props from './Props'

const TabContent: FC<Props> = ({ value, onChange }) => {
  return (
    <>
      <Select
        value={value.playerInputPresetType}
        onChange={newValue => {
          onChange({
            ...value,
            playerInputPresetType: newValue
          })
        }}
        options={[...playerInputPresetNames].map(([type, name]) => ({
          value: type,
          label: name
        }))}
      />
    </>
  )
}

export default TabContent
