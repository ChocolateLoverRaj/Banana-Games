import { Select } from 'antd'
import { FC } from 'react'
import playerInputPresetNames from '../../../playerInputPresetNames'
import InputInputsEditor from './inputInputsEditor/InputInputsEditor'
import Props from './Props'

const TabContent: FC<Props> = ({ value, onChange, playerInputs }) => {
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
      <br />
      {playerInputs.map((playerInput, index) => (
        <InputInputsEditor
          key={index}
          playerInput={playerInput}
          value={value.inputs[index]}
          onChange={newValue => {
            onChange({
              ...value,
              inputs: [
                ...value.inputs.slice(0, index),
                newValue,
                ...value.inputs.slice(index + 1)]
            })
          }}
        />
      ))}
    </>
  )
}

export default TabContent
