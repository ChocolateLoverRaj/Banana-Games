import * as React from 'react'
import { Typography } from 'antd'
import GameComponent from '../../types/GameComponent'
import GameWithSettings from './gameWithSettings/GameWithSettings'

export const Game: GameComponent = React.forwardRef((_props, ref) => {
  return (
    <GameWithSettings
      ref={ref}
      defaultPresets={[{
        name: 'Keyboard'
      }]}
      settings={[]}
    />
  )
})

export const description = (
  <Typography.Paragraph>
    Customize the controls.
  </Typography.Paragraph>
)
