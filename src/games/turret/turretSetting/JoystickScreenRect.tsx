import { observer } from 'mobx-react-lite'
import nipple from 'nipplejs'
import { useLayoutEffect } from 'react'
import { css } from '@emotion/css'
import cn from 'classnames'
import absolutePositionToCss from '../../../absolutePositionToCss'
import { action } from 'mobx'
import { purple } from '@ant-design/colors'
import RenderScreenRectOptions from '../../../util/gameSetting/RenderScreenRectOptions'
import { CommonParam } from '../../../util/gameSetting'
import Data from './Data'
import Context from './Context'
import { emit } from 'emitter2'

export type JoystickScreenRectProps = RenderScreenRectOptions & CommonParam<Data, Context>

const JoystickScreenRect = observer<JoystickScreenRectProps>(({
  screenRect,
  container,
  isPlaying,
  htmlProps,
  style,
  context
}) => {
  useLayoutEffect(() => {
    if (isPlaying) {
      const diameter = Math.min(screenRect.width, screenRect.height)
      const manager = nipple.create({
        zone: container,
        mode: 'static',
        position: Object.fromEntries([
          [screenRect.x.reverse ? 'right' : 'left', `${screenRect.x.value + diameter / 2}px`],
          [screenRect.y.reverse ? 'bottom' : 'top', `${screenRect.y.value + diameter / 2}px`]
        ]),
        size: diameter,
        restJoystick: false,
        color: purple.primary
      })
      manager.on('move', action(e => {
        const [{ frontPosition: { x, y } }] = e.target.actives
        emit(context, Math.atan2(y, x))
      }))

      return () => manager.destroy()
    }
  }, [isPlaying])

  return (
    <>
      {!isPlaying && (
        <div
          {...htmlProps as any}
          className={cn(css(style), htmlProps?.className)}
          style={absolutePositionToCss(screenRect)}
        />)}
    </>
  )
})

export default JoystickScreenRect
