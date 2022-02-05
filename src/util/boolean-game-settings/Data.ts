import AbsolutePosition from '../types/AbsolutePosition'
import { ReactNode } from 'react'
import Size from '../types/Size'

interface Data {
  name: string
  screenRects: Array<AbsolutePosition & Size>
  keyBindings: Set<string>
  defaultKeyBindings: Set<string>
  defaultButtons: Array<AbsolutePosition & Size>
  buttonContent: ReactNode
}

export default Data
