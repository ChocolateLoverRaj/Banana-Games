import { ReactNode } from 'react'
import AbsolutePosition from './AbsolutePosition'
import Size from '../../types/Size'

interface TouchInput {
  buttonContents: ReactNode
  buttons: Set<AbsolutePosition & Size>
}

export default TouchInput
