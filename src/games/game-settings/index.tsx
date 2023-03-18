import * as React from 'react'
import { Typography } from 'antd'
import GameComponent from '../../types/GameComponent'
import GameHelper from './gameWithSettings/GameHelper'
import PlayerInputType from './PlayerInputType'
import PlayerInputsPresetType from './PlayerInputsPresetType'
import useGame from './gameWithSettings/useGame/useGame'

export const Game: GameComponent = React.forwardRef((_props, ref) => {
  const game = useGame({
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
  })

  return (
    <GameHelper
      game={game}
      ref={ref}
    />
  )
})

export const description = (
  <Typography.Paragraph>
    Customize the controls.
  </Typography.Paragraph>
)
