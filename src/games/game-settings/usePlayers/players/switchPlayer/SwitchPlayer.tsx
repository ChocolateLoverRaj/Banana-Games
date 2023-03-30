import { ArrowLeftOutlined, UserSwitchOutlined } from '@ant-design/icons'
import { Button, Result, Typography } from 'antd'
import getObserve from 'observables/lib/observableValue/getObserve'
import reactObserver from 'observables/lib/reactObserver/reactObserver'
import { useState } from 'react'
import PresetChooser from '../presetChooser/PresetChooser'
import switchIo from '../switchIo/switchIo'
import Props from './Props'

const SwitchPlayer = reactObserver<Props>((
  observe,
  { players: playersObservableValue, backButton, presets }
) => {
  const { players } = observe(getObserve(playersObservableValue))
  const [selectedPlayer, setSelectedPlayer] = useState<number | undefined>(undefined)

  return (
    <>
      {selectedPlayer === undefined
        ? (
          <Result
            icon={<UserSwitchOutlined />}
            title="Who's switching IO?"
            subTitle={backButton}
            extra={
              <>
                {players.map((_player, index) => (
                  <Button
                    key={index}
                    size='large'
                    onClick={() => setSelectedPlayer(index)}
                  >
                    Player <Typography.Text code>{index}</Typography.Text>
                  </Button>
                ))}
              </>
             }
          />)
        : (
          <Result
            icon={<UserSwitchOutlined />}
            title={
              <>
                Choose a preset for player <Typography.Text code>{selectedPlayer}</Typography.Text>
              </>
            }
            subTitle={
              <Button
                danger
                icon={<ArrowLeftOutlined />}
                onClick={() => setSelectedPlayer(undefined)}
              >
                Back
              </Button>
            }
            extra={
              <PresetChooser
                presets={presets}
                onChoose={presetIndex => switchIo({
                  playersObservableValue,
                  newInputIndex: 0,
                  playerIndex: selectedPlayer,
                  presetIndex
                })}
              />
            }
          />
          )}
    </>
  )
})

export default SwitchPlayer
