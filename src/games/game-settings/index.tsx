import * as React from 'react'
import { Typography } from 'antd'
import GameComponent from '../../types/GameComponent'
import PlayerInputType from './PlayerInputType'
import PlayerInputsPresetType from './PlayerInputsPresetType'
import Input from './gameWithSettings/useGameSettings/Input'

export const Game: GameComponent = React.forwardRef((_props, ref) => {
  return (
    <div
      ref={ref}
    >
      TODO: Put inputs here
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
    playerInputPresetType: PlayerInputsPresetType.KEYBOARD_AND_MOUSE,
    inputs: [
      []
    ]
  }],
  playerInputs: [{
    name: 'A boolean player input',
    type: PlayerInputType.BOOLEAN
  }]
}

export const description = (
  <Typography.Paragraph>
    Customize the controls.
  </Typography.Paragraph>
)
