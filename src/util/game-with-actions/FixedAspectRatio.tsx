import Size from '../types/Size'
import { forwardRef } from 'react'
import BaseGame, { BaseGameProps } from './BaseGame'
import getScaledSize from '../getScaledSize'
import { gameDiv, maxSize } from './FixedAspectRatio.module.scss'
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
    <div ref={ref} className={cn(className, maxSize)}>
      <div className={gameDiv} style={scaledSize}>
        <BaseGame {...{ loadedGameConfig, size }}>{children}</BaseGame>
      </div>
    </div>
  )
})

export default FixedAspectRatio
