import { Dispatch, ReactNode, FC, useRef } from 'react'
import absolutePositionToCss from '../../absolutePositionToCss'
import TouchInput from './TouchInput'
import AbsolutePosition from './types/AbsolutePosition'
import { button } from './TouchButtonEdit.module.scss'
import Position from './types/Position'
import never from 'never'
import toSigned from 'boolean-to-signed'
import Size from '../types/Size'
import limitNumber from 'limit-number'

export interface TouchButtonEditProps {
  absolutePosition: AbsolutePosition & Size
  onAbsolutePositionChange: Dispatch<AbsolutePosition>
  children: ReactNode
  boundary: Size
}

const TouchButtonEdit: FC<TouchButtonEditProps> = props => {
  const { absolutePosition, onAbsolutePositionChange, children, boundary } = props

  const buttonRef = useRef(null)
  const boxRef = useRef(null)
  const touchPosition = useRef<Position>()

  return (
  // TODO - once https://github.com/react-grid-layout/react-draggable/issues/586 is closed,
  // use only one draggable
    <>
      <TouchInput ref={buttonRef} absolutePosition={absolutePosition}>{children}</TouchInput>
      <div
        ref={boxRef}
        className={button}
        style={absolutePositionToCss(absolutePosition)}
        onTouchStart={e => {
          const { clientX, clientY } = e.touches[0]
          touchPosition.current = { x: clientX, y: clientY }
        }}
        onTouchMove={e => {
          const { clientX, clientY } = e.touches[0]
          const { x, y } = touchPosition.current ?? never('onTouchMove fired without onTouchStart')
          const oldX = absolutePosition.x.value
          const xDiffMultiplier = toSigned(!absolutePosition.x.reverse)
          const newX = limitNumber(0, boundary.width - absolutePosition.width, oldX + (clientX - x) * xDiffMultiplier)
          const oldY = absolutePosition.y.value
          const yDiffMultiplier = toSigned(!absolutePosition.y.reverse)
          const newY = limitNumber(0, boundary.height - absolutePosition.height, oldY + (clientY - y) * yDiffMultiplier)
          onAbsolutePositionChange({
            ...absolutePosition,
            x: {
              ...absolutePosition.x,
              value: newX
            },
            y: {
              ...absolutePosition.y,
              value: newY
            }
          })
          touchPosition.current = {
            x: x + (newX - oldX) * xDiffMultiplier,
            y: y + (newY - oldY) * yDiffMultiplier
          }
        }}
      />
    </>
  )
}

export default TouchButtonEdit