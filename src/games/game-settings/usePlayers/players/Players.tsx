import { ApiOutlined, UserAddOutlined } from '@ant-design/icons'
import { Button, Result, Spin, Typography } from 'antd'
import never from 'never'
import getObserve from 'observables/lib/observableValue/getObserve'
import reactObserver from 'observables/lib/reactObserver/reactObserver'
import get from 'observables/lib/syncAsync/get/get'
import useGameSettings from '../../gameWithSettings/useGameSettings/useGameSettings'
import playerIoPresetNames from '../../playerIoPresetNames'
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
        (data.players.length === 1
          ? (
            <Result
              icon={<UserAddOutlined />}
              title={`New ${playerIoPresetNames.get(data.newInputs[0].type) ?? never()} detected`}
              subTitle={
                <>
                  ID: <Typography.Text code>{data.newInputs[0].id}</Typography.Text><br />
                  Choose a preset
                </>
          }
              extra={
                <>
                  {settings !== undefined
                    ? settings.playerInputsPresets
                      .filter(({ playerInputPresetType }) =>
                        playerInputPresetType === data.newInputs[0].type)
                      .map(({ name }, index) => <Button key={index}>{name}</Button>)
                    : <Spin />}
                </>
          }
            />
            )
          : (
            <SwitchOrAdd
              name={playerIoPresetNames.get(data.newInputs[0].type) ?? never()}
              id={data.newInputs[0].id}
            />))}
      {children}
    </div>
  )
})

export default Players
