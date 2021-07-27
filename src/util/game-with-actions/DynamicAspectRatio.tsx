import { forwardRef } from 'react'
import BaseGame, { BaseGameProps } from './BaseGame'
import { game } from './DynamicAspectRatio.module.scss'
import cn from 'classnames'

export interface DynamicAspectRatioProps extends BaseGameProps {
  className?: string
}

const DynamicAspectRatio = forwardRef<HTMLDivElement, DynamicAspectRatioProps>((props, ref) => {
  const { loadedGameConfig, size, children, className } = props

  return (
    <div ref={ref} className={cn(game, className)}>
      <BaseGame {...{ loadedGameConfig, size }}>{children}</BaseGame>
    </div>
  )
})

export default DynamicAspectRatio
