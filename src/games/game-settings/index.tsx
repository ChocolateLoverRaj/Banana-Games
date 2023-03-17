import * as React from 'react'
import { Typography } from 'antd'
import GameComponent from '../../types/GameComponent'
import GameWithSettings from './gameWithSettings/GameWithSettings'
import PlayerInputType from './PlayerInputType'
import PlayerInputsPresetType from './PlayerInputsPresetType'

export const Game: GameComponent = React.forwardRef((_props, ref) => {
  return (
    <GameWithSettings
      id='game-settings'
      version={0}
      upgrade={undefined}
      ref={ref}
      defaultSettingsPresets={[{
        name: 'Default Preset'
      }]}
      settings={[]}
      defaultPlayerInputsPresets={[{
        name: 'Keyboard & Mouse',
        playerInputPresetType: PlayerInputsPresetType.KEYBOARD_AND_MOUSE,
        inputs: [
          []
        ]
      }]}
      playerInputs={[{
        name: 'A boolean player input',
        type: PlayerInputType.BOOLEAN
      }]}
    />
  )
})

export const description = (
  <Typography.Paragraph>
    Customize the controls.
  </Typography.Paragraph>
)
