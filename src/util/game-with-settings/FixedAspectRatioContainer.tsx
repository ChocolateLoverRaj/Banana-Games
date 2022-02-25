import Size from '../types/Size'
import { forwardRef, PropsWithChildren } from 'react'
import getScaledSize from '../getScaledSize'
import { css } from '@emotion/css'
import cn from 'classnames'
import farContainerStyles from '../../farContainerStyles'
import farStyles from '../../farStyles'

export type FixedAspectRatioProps = PropsWithChildren<{
  aspectRatio: Size
  className?: string
  size: Size
}>

const FixedAspectRatioContainer = forwardRef<HTMLDivElement, FixedAspectRatioProps>(
  (props, ref) => {
    const { size, aspectRatio, children, className } = props

    const scaledSize = getScaledSize(size, aspectRatio)

    return (
      <div
        ref={ref}
        className={css(farContainerStyles)}
      >
        <div
          className={cn(className, css(farStyles))}
          style={scaledSize}
        >
          {children}
        </div>
      </div>
    )
  })

export default FixedAspectRatioContainer
