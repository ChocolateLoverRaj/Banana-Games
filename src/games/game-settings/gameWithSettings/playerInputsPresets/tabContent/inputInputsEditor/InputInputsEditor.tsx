import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { FC } from 'react'
import booleanPlayerInputKeyboard from
  '../../../../booleanPlayerInputKeyboard/booleanPlayerInputKeyboard'
import PlayerInputId from '../../../PlayerInputId'
import InputInputEditor from './inputInputEditor/InputInputEditor'
import Props from './Props'

const InputInputsEditor: FC<Props> = ({ playerInput, value, onChange }) => {
  return (
    <>
      <h2>{playerInput.name}</h2>
      {value.map((inputInput, index) => (
        <InputInputEditor
          key={index}
          value={inputInput}
          onChange={newInputInput => {
            onChange([
              ...value.slice(0, index),
              newInputInput,
              ...value.slice(index + 1)
            ])
          }}
          onDelete={() => {
            onChange([
              ...value.slice(0, index),
              ...value.slice(index + 1)
            ])
          }}
        />
      ))}
      {value.length === 0 && <div><i>No inputs</i></div>}
      <Button
        onClick={() => {
          onChange([
            ...value,
            {
              id: PlayerInputId.BOOLEAN_KEYBOARD,
              data: booleanPlayerInputKeyboard.getDefaultData()
            }
          ])
        }}
        icon={<PlusOutlined />}
      >
        Add
      </Button>
    </>
  )
}

export default InputInputsEditor
