import { ReactNode } from 'react'
import AbsolutePosition from '../types/AbsolutePosition'
import Size from '../types/Size'
import RenderScreenRectOptions from './RenderScreenRectOptions'

abstract class GameSetting {
  abstract readonly displayName: string

  abstract renderEdit (): ReactNode

  abstract resetToDefault (): void

  abstract get isSameAsDefault (): boolean

  abstract screenRects: Array<AbsolutePosition & Size>

  abstract renderScreenRect (options: RenderScreenRectOptions): ReactNode
}

export default GameSetting
