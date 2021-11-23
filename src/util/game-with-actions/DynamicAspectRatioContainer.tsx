import { forwardRef, PropsWithChildren } from 'react'
import cn from 'classnames'
import { css } from '@emotion/css'
import dynamicAspectRatioStyles from '../../dynamicAspectRatioStyles'

export type DynamicAspectRatioProps = PropsWithChildren<{
  className?: string
}>

const DynamicAspectRatioContainer = forwardRef<HTMLDivElement, DynamicAspectRatioProps>((props, ref) => {
  const { children, className } = props

  return (
    <div ref={ref} className={cn(css(dynamicAspectRatioStyles), className)}>
      {children}
    </div>
  )
})

export default DynamicAspectRatioContainer
