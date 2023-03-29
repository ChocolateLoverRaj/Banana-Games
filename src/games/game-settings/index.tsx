import * as React from 'react'
import { Tag, Typography } from 'antd'
import GameComponent from '../../types/GameComponent'
import PlayerIoType from './PlayerIoType'
import PlayerIosPresetType from './PlayerIosPresetType'
import Input from './gameWithSettings/useGameSettings/Input'
import usePlayers from './usePlayers/usePlayers'
import Players from './usePlayers/players/Players'

export const Game: GameComponent = React.forwardRef((_props, ref) => {
  const players = usePlayers({ useGameSettingsInput: settings, maxPlayers: Infinity })

  return (
    <div
      ref={ref}
    >
      <Players players={players} useGameSettingsInput={settings}>
        <Tag.CheckableTag
          checked
        >
          Boolean Input Pressed
        </Tag.CheckableTag>
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
