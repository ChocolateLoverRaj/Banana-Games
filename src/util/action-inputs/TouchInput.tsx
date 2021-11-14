import { forwardRef, ReactNode } from 'react'
import { Button, ButtonProps } from 'antd'
import { css } from '@emotion/css'
import AbsolutePosition from './types/AbsolutePosition'
import absolutePositionToCss from '../../absolutePositionToCss'
import Size from '../types/Size'

export interface TouchInputProps {
  children: ReactNode
  absolutePosition: AbsolutePosition & Size
  buttonProps?: ButtonProps
}

const TouchInput = forwardRef<any, TouchInputProps>((props, ref) => {
  const { children, absolutePosition, buttonProps } = props

  const absoluteCn = css({ '&&': { position: 'absolute' } })

  return (
    <Button
      {...buttonProps}
      ref={ref}
      className={absoluteCn}
      style={absolutePositionToCss(absolutePosition)}
    >
      {children}
    </Button>
  )
})

export default TouchInput
