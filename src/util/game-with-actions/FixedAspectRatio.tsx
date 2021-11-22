import Size from '../types/Size'
import { forwardRef } from 'react'
import BaseGame, { BaseGameProps } from './BaseGame'
import getScaledSize from '../getScaledSize'
import { css } from '@emotion/css'
import cn from 'classnames'

export interface FixedAspectRatioProps<Action extends string = string> extends
  BaseGameProps<Action> {
  aspectRatio: Size
  className?: string
}

const FixedAspectRatio = forwardRef<HTMLDivElement, FixedAspectRatioProps>((props, ref) => {
  const { loadedGameConfig, size, aspectRatio, children, className } = props

  const scaledSize = getScaledSize(size, aspectRatio)

  return (
    <div
      ref={ref}
      className={css(`
          width: 100%;
          height: 100%;
          overflow: hidden;
          padding: 0;
          position: relative;`)}
    >
      <div
        className={cn(className, css(`
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          text-align: center;`))}
        style={scaledSize}
      >
        <BaseGame {...{ loadedGameConfig, size }}>{children}</BaseGame>
      </div>
    </div>
  )
})

export default FixedAspectRatio
