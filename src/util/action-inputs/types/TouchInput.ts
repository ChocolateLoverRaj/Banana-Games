import { ReactNode } from 'react'
import AbsolutePosition from './AbsolutePosition'
import { Set } from 'immutable'
import Size from '../../types/Size'

interface TouchInput {
  buttonContents: ReactNode
  buttons: Set<AbsolutePosition & Size>
}

export default TouchInput
