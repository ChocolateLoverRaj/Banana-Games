import { ReactNode } from 'react'
import { Button, ButtonProps } from 'antd'
import { css, CSSInterpolation } from '@emotion/css'
import AbsolutePosition from '../types/AbsolutePosition'
import absolutePositionToCss from '../../absolutePositionToCss'
import Size from '../types/Size'
import cx from 'classnames'
import { observer } from 'mobx-react-lite'

export interface TouchInputProps {
  children: ReactNode
  absolutePosition: AbsolutePosition & Size
  buttonProps?: ButtonProps
  className?: string
  style?: CSSInterpolation
}

const TouchButton = observer<TouchInputProps, any>((props, ref) => {
  const { children, absolutePosition, buttonProps, className, style } = props

  const absoluteCn = css({ '&&': [{ position: 'absolute', padding: 0 }, style] })

  return (
    <Button
      {...buttonProps}
      ref={ref}
      className={cx(absoluteCn, className, buttonProps?.className)}
      style={absolutePositionToCss(absolutePosition)}
    >
      {children}
    </Button>
  )
}, { forwardRef: true })

export default TouchButton
