import { Select, Table } from 'antd'
import { FC } from 'react'
import playerInputPresetNames from '../../../playerInputPresetNames'
import PlayerInputWithInfo from '../../../PlayerInputWithInfo'
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
            playerInputPresetType: newValue,
            inputs: value.inputs.map(() => [])
          })
        }}
        options={[...playerInputPresetNames].map(([type, name]) => ({
          value: type,
          label: name
        }))}
      />
      <br />
      <Table
        dataSource={playerInputs}
        columns={[{
          title: 'Name',
          render: ({ name }: PlayerInputWithInfo) => (
            <>{name}</>
          )
        }, {
          title: 'Inputs',
          render: ({ type }: PlayerInputWithInfo, record, index) => (
            <InputInputsEditor
              playerInputType={playerInputs[index].type}
              playerInputsPresetType={value.playerInputPresetType}
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
          )
        }]}
        pagination={false}
        rowKey={playerInput => playerInputs.indexOf(playerInput)}
      />
    </>
  )
}

export default TabContent
