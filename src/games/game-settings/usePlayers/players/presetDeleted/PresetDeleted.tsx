import { ToolOutlined } from '@ant-design/icons'
import { Result } from 'antd'
import { FC } from 'react'
import Props from './Props'
import PresetChooser from '../presetChooser/PresetChooser'
import set from 'observables/lib/observableValue/set'
import get from 'observables/lib/observableValue/get'

const PresetDeleted: FC<Props> = ({ players, index, presets }) => {
  return (
    <Result
      icon={<ToolOutlined />}
      title={`Player ${index}'s selected IO preset was deleted`}
      subTitle='Choose a different preset'
      extra={
        <PresetChooser
          presets={presets}
          onChoose={newPresetId => {
            const playersState = get(players)
            set(players, {
              ...playersState,
              players: [
                ...playersState.players.slice(0, index),
                {
                  ...playersState.players[index],
                  selectedPreset: newPresetId
                },
                ...playersState.players.slice(index + 1)
              ]
            })
          }}
        />
      }
    />
  )
}

export default PresetDeleted
