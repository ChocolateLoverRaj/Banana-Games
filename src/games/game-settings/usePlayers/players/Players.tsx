import { ApiOutlined } from '@ant-design/icons'
import { Result } from 'antd'
import never from 'never'
import getObserve from 'observables/lib/observableValue/getObserve'
import reactObserver from 'observables/lib/reactObserver/reactObserver'
import get from 'observables/lib/syncAsync/get/get'
import useGameSettings from '../../gameWithSettings/useGameSettings/useGameSettings'
import playerIoPresetNames from '../../playerIoPresetNames'
import addPlayer from './addPlayer/addPlayer'
import AddPlayer from './addPlayerComponent/AddPlayer'
import getPresetOptions from './getPresetOptions'
import Props from './Props'
import SwitchOrAdd from './switchOrAdd/SwitchOrAdd'

const Players = reactObserver<Props>((observe, { players, children, useGameSettingsInput }) => {
  const data = observe(getObserve(players))
  const { data: settings } = observe(get(useGameSettings(useGameSettingsInput)))

  return (
    <div>
      {data.players.length + data.newInputs.length === 0 && (
        <Result
          icon={<ApiOutlined />}
          title='Connect input to play'
        />
      )}
      {data.newInputs[0] !== undefined &&
        (data.players.length === 0
          ? (
            <AddPlayer
              ioName={playerIoPresetNames.get(data.newInputs[0].type) ?? never()}
              id={data.newInputs[0].id}
              presets={getPresetOptions(settings?.playerInputsPresets, data.newInputs[0].type)}
              onAdd={presetIndex => addPlayer({
                playersObservableValue: players,
                newInputIndex: 0,
                presetIndex
              })}
            />
            )
          : (
            <SwitchOrAdd
              name={playerIoPresetNames.get(data.newInputs[0].type) ?? never()}
              id={data.newInputs[0].id}
              presets={getPresetOptions(settings?.playerInputsPresets, data.newInputs[0].type)}
              players={players}
            />))}
      {children}
    </div>
  )
})

export default Players
