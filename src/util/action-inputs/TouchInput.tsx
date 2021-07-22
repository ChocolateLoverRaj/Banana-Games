import { forwardRef, ReactNode } from 'react'
import { Button, ButtonProps } from 'antd'
import { button } from './TouchInput.module.scss'

import AbsolutePosition from './types/AbsolutePosition'
import absolutePositionToCss from '../../absolutePositionToCss'

export interface TouchInputProps {
  children: ReactNode
  absolutePosition: AbsolutePosition
  buttonProps?: ButtonProps
}

const TouchInput = forwardRef<any, TouchInputProps>((props, ref) => {
  const { children, absolutePosition, buttonProps } = props

  return (
    <Button
      {...buttonProps}
      ref={ref}
      className={button}
      style={absolutePositionToCss(absolutePosition)}
    >
      {children}
    </Button>
  )
})

export default TouchInput
