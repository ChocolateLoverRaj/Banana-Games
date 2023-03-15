import * as React from 'react'
import { Typography } from 'antd'
import GameComponent from '../../types/GameComponent'
import GameWithSettings from './gameWithSettings/GameWithSettings'
import PlayerInputType from './PlayerInputType'

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
        name: 'Keyboard'
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
