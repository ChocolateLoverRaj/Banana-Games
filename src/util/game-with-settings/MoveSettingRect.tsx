import { useRef } from 'react'
import AbsolutePosition from '../types/AbsolutePosition'
import never from 'never'
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
}

const MoveSettingRect = observer<MoveSettingRectProps>(props => {
  const { screenRect, setting, boundary } = props

  const touchPosition = useRef<Position>()

  return (
    <>
      {setting.renderScreenRect(screenRect, false, {
        onTouchStart: e => {
          const { clientX, clientY } = e.touches[0]
          touchPosition.current = { x: clientX, y: clientY }
        },
        onTouchMove: action(e => {
          const { clientX, clientY } = e.touches[0]
          const { x, y } = touchPosition.current ?? never('onTouchMove fired without onTouchStart')
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
      }, `
      position: absolute;
      border: 1px solid green;
      background-color: change-color($color: green, $alpha: 0.5);
      box-sizing: content-box;
    `)}
    </>
  )
})

export default MoveSettingRect
