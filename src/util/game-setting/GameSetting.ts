import { ReactNode, HTMLProps } from 'react'
import AbsolutePosition from '../types/AbsolutePosition'
import Size from '../types/Size'
import { CSSInterpolation } from '@emotion/css'

abstract class GameSetting {
  abstract readonly displayName: string

  abstract renderEdit (): ReactNode

  abstract resetToDefault (): void

  abstract get isSameAsDefault (): boolean

  abstract screenRects: Array<AbsolutePosition & Size>

  abstract renderScreenRect (
    screenRect: AbsolutePosition & Size,
    isPlaying: boolean,
    htmlProps?: HTMLProps<HTMLElement>,
    style?: CSSInterpolation
  ): ReactNode
}

export default GameSetting
