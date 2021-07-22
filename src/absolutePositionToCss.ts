import AbsolutePosition from './util/action-inputs/types/AbsolutePosition'
import { CSSProperties } from 'react'

const absolutePositionToCss = ({ x, y, width, height }: AbsolutePosition): CSSProperties => ({
  [x.reverse ? 'right' : 'left']: x.value,
  [y.reverse ? 'bottom' : 'top']: y.value,
  width,
  height
})

export default absolutePositionToCss
