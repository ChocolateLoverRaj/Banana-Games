import { FC } from 'react'
import Props from './Props'
import { Button, Select } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import playerInputs from '../../../../../playerInputs'
import never from 'never'

const InputInputEditor: FC<Props> = ({ value, onChange, onDelete, playerInputsPresetType }) => {
  const inputFns = playerInputs.get(value.id) ?? never()

  return (
    <div>
      <Select
        value={value.id}
        onChange={newId => onChange({
          id: newId,
          data: (playerInputs.get(newId) ?? never()).getDefaultData()
        })}
        options={[...playerInputs]
          .filter(([id, { playerInputsPresetType: currentPlayerInputsPresetType }]) =>
            currentPlayerInputsPresetType === playerInputsPresetType)
          .map(([id, { name }]) => ({
            value: id,
            label: name
          }))}
      />
      <Button
        icon={<DeleteOutlined />}
        onClick={onDelete}
        danger
      />
      <br />
      {inputFns.renderEdit({
        value: value.data,
        onChange: newData => onChange({
          ...value,
          data: newData
        })
      })}
    </div>
  )
}

export default InputInputEditor
