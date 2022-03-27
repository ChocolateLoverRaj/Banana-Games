import AbsolutePosition from '../types/AbsolutePosition'
import Size from '../types/Size'
import { HTMLProps } from 'react'
import { CSSInterpolation } from '@emotion/css'

interface RenderScreenRectOptions {
  screenRect: AbsolutePosition & Size
  isPlaying: boolean
  htmlProps?: HTMLProps<HTMLElement>
  style?: CSSInterpolation
  container: HTMLDivElement
  touchScreen: boolean
}

export default RenderScreenRectOptions
