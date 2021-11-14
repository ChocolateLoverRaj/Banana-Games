import { forwardRef } from 'react'
import BaseGame, { BaseGameProps } from './BaseGame'
import cn from 'classnames'
import { css } from '@emotion/css'
import dynamicAspectRatioStyles from '../../dynamicAspectRatioStyles'

export interface DynamicAspectRatioProps extends BaseGameProps {
  className?: string
}

const DynamicAspectRatio = forwardRef<HTMLDivElement, DynamicAspectRatioProps>((props, ref) => {
  const { loadedGameConfig, size, children, className } = props

  return (
    <div ref={ref} className={cn(css(dynamicAspectRatioStyles), className)}>
      <BaseGame {...{ loadedGameConfig, size }}>{children}</BaseGame>
    </div>
  )
})

export default DynamicAspectRatio
