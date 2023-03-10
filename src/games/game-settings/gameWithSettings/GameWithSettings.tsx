import { forwardRef } from 'react'
import Props from './Props'
import 'react-edit-text/dist/index.css'

const GameWithSettings = forwardRef<HTMLDivElement, Props>(({ settings }, ref) => {
  return (
    // TODO: Save and load presets to indexed db
    <div ref={ref}>
      hi
    </div>
  )
})

export default GameWithSettings
