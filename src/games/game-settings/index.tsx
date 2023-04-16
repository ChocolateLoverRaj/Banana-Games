import * as React from 'react'
import { Spin, Tag, Typography } from 'antd'
import GameComponent from '../../types/GameComponent'
import PlayerIoType from './PlayerIoType'
import PlayerIosPresetType from './PlayerIosPresetType'
import Input from './gameWithSettings/useGameSettings/Input'
import usePlayers from './usePlayers/usePlayers'
import Players from './usePlayers/players/Players'
import useGameSettings from './gameWithSettings/useGameSettings/useGameSettings'
import getTypeSpecific from './usePlayers/getTypeSpecific'
import reactObserver from 'observables/lib/reactObserver/reactObserver'
import getObserve from 'observables/lib/observableValue/getObserve'
import get from 'observables/lib/syncAsync/get/get'
import Observable from 'observables/lib/Observable'

export const Game: GameComponent = reactObserver((observe, _props, ref) => {
  const players = usePlayers({ useGameSettingsInput: settings, maxPlayers: Infinity })
  const useGameSettingsOutput = useGameSettings(settings)

  return (
    <div
      ref={ref}
    >
      <Players players={players} useGameSettingsInput={settings}>
        {observe(getObserve(players)).players.map((player, index) => {
          const observable = observe(getTypeSpecific<Observable<boolean>>(players, index, 0, useGameSettingsOutput, PlayerIoType.BOOLEAN))
          return (
            <Spin spinning={observable === undefined} key={index}>
              <Tag.CheckableTag
                checked={observable !== undefined && observe(observable)}
              >
                Boolean Input Pressed
              </Tag.CheckableTag>
            </Spin>
          )
        })}
      </Players>
    </div>
  )
})

export const settings: Input = {
  id: 'game-settings',
  version: 0,
  upgrade: undefined,
  defaultSettingsPresets: [{
    name: 'Default Preset'
  }],
  settings: [],
  defaultPlayerInputsPresets: [{
    name: 'Keyboard & Mouse',
    playerInputPresetType: PlayerIosPresetType.KEYBOARD_AND_MOUSE,
    inputs: [
      [],
      []
    ]
  }],
  playerInputs: [{
    name: 'A boolean player input',
    type: PlayerIoType.BOOLEAN
  }, {
    name: 'Action',
    type: PlayerIoType.ACTION
  }]
}

export const description = (
  <Typography.Paragraph>
    Customize the controls.
  </Typography.Paragraph>
)
