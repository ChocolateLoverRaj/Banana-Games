import * as React from 'react'
import { Typography } from 'antd'
import GameComponent from '../../types/GameComponent'
import GameWithSettings from './gameWithSettings/GameWithSettings'
import PlayerInputType from './PlayerInputType'
import PlayerInputPresetType from './PlayerInputPresetType'

export const Game: GameComponent = React.forwardRef((_props, ref) => {
  return (
    <GameWithSettings
      id='game-settings'
      ref={ref}
      defaultSettingsPresets={[{
        name: 'Default Preset'
      }]}
      settings={[]}
      defaultPlayerInputsPresets={[{
        name: 'Keyboard & Mouse',
        playerInputPresetType: PlayerInputPresetType.KEYBOARD_AND_MOUSE
      }]}
      playerInputs={[PlayerInputType.BOOLEAN]}
    />
  )
})

export const description = (
  <Typography.Paragraph>
    Customize the controls.
  </Typography.Paragraph>
)
