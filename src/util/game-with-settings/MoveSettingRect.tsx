import { useRef, RefObject, Touch, MouseEvent } from 'react'
import AbsolutePosition from '../types/AbsolutePosition'
import toSigned from 'boolean-to-signed'
import Size from '../types/Size'
import limitNumber from 'limit-number'
import { observer } from 'mobx-react-lite'
import { action } from 'mobx'
import { GameSetting } from '../game-setting'
import Position from '../types/Position'

export interface MoveSettingRectProps {
  setting: GameSetting
  screenRect: AbsolutePosition & Size
  boundary: Size
  containerRef: RefObject<HTMLDivElement>
}

const MoveSettingRect = observer<MoveSettingRectProps>(props => {
  const { screenRect, setting, boundary, containerRef } = props

  const touchPosition = useRef<Position>()

  const handleMouseDown = (e: MouseEvent | Touch): void => {
    const { clientX, clientY } = e
    touchPosition.current = { x: clientX, y: clientY }
  }
  const handleMouseMove = action((e: MouseEvent | Touch): void => {
    if (touchPosition.current === undefined) return
    const { clientX, clientY } = e
    const { x, y } = touchPosition.current
    const oldX = screenRect.x.value
    const xDiffMultiplier = toSigned(!screenRect.x.reverse)
    const newX = limitNumber(0, boundary.width - screenRect.width, oldX + (clientX - x) * xDiffMultiplier)
    const oldY = screenRect.y.value
    const yDiffMultiplier = toSigned(!screenRect.y.reverse)
    const newY = limitNumber(0, boundary.height - screenRect.height, oldY + (clientY - y) * yDiffMultiplier)
    screenRect.x.value = newX
    screenRect.y.value = newY
    touchPosition.current = {
      x: x + (newX - oldX) * xDiffMultiplier,
      y: y + (newY - oldY) * yDiffMultiplier
    }
  })

  const handleMouseUp = (): void => {
    touchPosition.current = undefined
  }

  return (
    <>
      {setting.renderScreenRect({
        screenRect,
        isPlaying: false,
        htmlProps: {
          onMouseDown: handleMouseDown,
          onMouseMove: handleMouseMove,
          onMouseUp: handleMouseUp,
          onTouchStart: e => handleMouseDown(e.touches[0]),
          onTouchMove: action(e => handleMouseMove(e.touches[0])),
          onTouchEnd: handleMouseUp
        },
        style: `
          position: absolute;
          border: 1px solid green;
          background-color: change-color($color: green, $alpha: 0.5);
          box-sizing: content-box;
        `,
        container: containerRef.current as any
      })}
    </>
  )
})

export default MoveSettingRect
