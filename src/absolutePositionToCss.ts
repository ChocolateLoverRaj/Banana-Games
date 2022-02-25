import AbsolutePosition from './util/types/AbsolutePosition'
import { CSSProperties } from 'react'
import Size from './util/types/Size'

const absolutePositionToCss = (
  { x, y, width, height }: AbsolutePosition & Size
): CSSProperties => ({
  [x.reverse ? 'right' : 'left']: x.value,
  [y.reverse ? 'bottom' : 'top']: y.value,
  width,
  height
})

export default absolutePositionToCss
