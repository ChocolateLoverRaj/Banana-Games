import AbsolutePosition from '../types/AbsolutePosition'
import Size from '../types/Size'
import { ReactNode } from 'react'

abstract class ScreenRect {
  abstract render (): ReactNode
  abstract get position (): AbsolutePosition & Size
}

export default ScreenRect
