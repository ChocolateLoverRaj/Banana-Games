import { PlusOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import { FC } from 'react'
import playerInputs from '../../../../playerInputs'
import InputInputEditor from './inputInputEditor/InputInputEditor'
import Props from './Props'

const InputInputsEditor: FC<Props> = ({
  value,
  onChange,
  playerInputsPresetType,
  playerInputType
}) => {
  const defaultPlayerInputToAdd = [...playerInputs].find(
    ([id, { playerInputsPresetType: currentPlayerInputsPresetType, inputType }]) =>
      currentPlayerInputsPresetType === playerInputsPresetType &&
      inputType === playerInputType)

  const addButton = (
    <Button
      disabled={defaultPlayerInputToAdd === undefined}
      onClick={defaultPlayerInputToAdd !== undefined
        ? () => {
            onChange([
              ...value,
              {
                id: defaultPlayerInputToAdd[0],
                data: defaultPlayerInputToAdd[1].getDefaultData()
              }
            ])
          }
        : undefined}
      icon={<PlusOutlined />}
    >
      Add
    </Button>
  )

  return (
    <>
      {value.map((inputInput, index) => (
        <InputInputEditor
          key={index}
          playerInputsPresetType={playerInputsPresetType}
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
      {defaultPlayerInputToAdd !== undefined
        ? addButton
        : (
          <Tooltip
            title='No inputs available for the selected preset type' color='red'
          >
            {addButton}
          </Tooltip>)}
    </>
  )
}

export default InputInputsEditor