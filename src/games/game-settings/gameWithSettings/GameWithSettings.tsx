import { forwardRef } from 'react'
import Props from './Props'
import 'react-edit-text/dist/index.css'
import PlayerInputsPresets from './playerInputsPresets/PlayerInputsPresets'

const GameWithSettings = forwardRef<HTMLDivElement, Props>((props, ref) => {
  return (
    // TODO: Save and load presets to indexed db
    <div ref={ref}>
      <PlayerInputsPresets {...props} />
    </div>
  )
})

export default GameWithSettings
