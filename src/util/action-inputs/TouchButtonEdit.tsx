import { ReactNode, useRef } from 'react'
import absolutePositionToCss from '../../absolutePositionToCss'
import TouchInput from './TouchButton'
import AbsolutePosition from './types/AbsolutePosition'
import Position from './types/Position'
import never from 'never'
import toSigned from 'boolean-to-signed'
import Size from '../types/Size'
import limitNumber from 'limit-number'
import { css } from '@emotion/css'
import { observer } from 'mobx-react-lite'
import { action } from 'mobx'

export interface TouchButtonEditProps {
  absolutePosition: AbsolutePosition & Size
  children: ReactNode
  boundary: Size
}

const TouchButtonEdit = observer<TouchButtonEditProps>(props => {
  const { absolutePosition, children, boundary } = props

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
        className={css`
          position: absolute;
          border: 1px solid green;
          background-color: change-color($color: green, $alpha: 0.5);
          box-sizing: content-box;
        `}
        style={absolutePositionToCss(absolutePosition)}
        onTouchStart={e => {
          const { clientX, clientY } = e.touches[0]
          touchPosition.current = { x: clientX, y: clientY }
        }}
        onTouchMove={action(e => {
          const { clientX, clientY } = e.touches[0]
          const { x, y } = touchPosition.current ?? never('onTouchMove fired without onTouchStart')
          const oldX = absolutePosition.x.value
          const xDiffMultiplier = toSigned(!absolutePosition.x.reverse)
          const newX = limitNumber(0, boundary.width - absolutePosition.width, oldX + (clientX - x) * xDiffMultiplier)
          const oldY = absolutePosition.y.value
          const yDiffMultiplier = toSigned(!absolutePosition.y.reverse)
          const newY = limitNumber(0, boundary.height - absolutePosition.height, oldY + (clientY - y) * yDiffMultiplier)
          absolutePosition.x.value = newX
          absolutePosition.y.value = newY
          touchPosition.current = {
            x: x + (newX - oldX) * xDiffMultiplier,
            y: y + (newY - oldY) * yDiffMultiplier
          }
        })}
      />
    </>
  )
})

export default TouchButtonEdit
