import { FC } from 'react'
import Props from './Props'
import { Button, Select } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import playerIos from '../../playerIos'
import never from 'never'
import filterPlayerIos from '../filterPlayerIos/filterPlayerIos'

const InputInputEditor: FC<Props> = ({
  value,
  onChange,
  onDelete,
  playerIosPresetType,
  playerIoType
}) => {
  const inputFns = playerIos.get(value.id) ?? never()

  return (
    <div>
      <Select
        value={value.id}
        onChange={newId => onChange({
          id: newId,
          data: (playerIos.get(newId) ?? never()).getDefaultData()
        })}
        options={[...playerIos]
          .filter(filterPlayerIos({ playerIosPresetType, playerIoType }))
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
        }),
        playerIosPresetType
      })}
    </div>
  )
}

export default InputInputEditor
