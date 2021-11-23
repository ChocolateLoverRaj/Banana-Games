import Size from '../types/Size'
import { forwardRef, PropsWithChildren } from 'react'
import getScaledSize from '../getScaledSize'
import { css } from '@emotion/css'
import cn from 'classnames'

export type FixedAspectRatioProps = PropsWithChildren<{
  aspectRatio: Size
  className?: string
  size: Size
}>

const FixedAspectRatioContainer = forwardRef<HTMLDivElement, FixedAspectRatioProps>((props, ref) => {
  const { size, aspectRatio, children, className } = props

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
        {children}
      </div>
    </div>
  )
})

export default FixedAspectRatioContainer
