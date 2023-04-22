import { Select, Table } from 'antd'
import { FC } from 'react'
import playerIoPresetNames from '../../../playerIoPresetNames'
import PlayerIoWithInfo from '../../../PlayerIoWithInfo'
import InputInputsEditor from '../../../inputInputsEditor/InputInputsEditor'
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
        options={[...playerIoPresetNames].map(([type, name]) => ({
          value: type,
          label: name
        }))}
      />
      <br />
      <Table
        dataSource={playerInputs}
        columns={[{
          title: 'Name',
          render: ({ name }: PlayerIoWithInfo) => (
            <>{name}</>
          )
        }, {
          title: 'Inputs',
          render: ({ type }: PlayerIoWithInfo, record, index) => (
            <InputInputsEditor
              playerIoType={playerInputs[index].type}
              playerIosPresetType={value.playerInputPresetType}
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
