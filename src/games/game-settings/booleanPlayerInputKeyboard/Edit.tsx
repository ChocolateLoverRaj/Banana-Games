import { Dispatch, KeyboardEventHandler, useRef } from 'react'
import { Input, InputProps, InputRef } from 'antd'
import { css, keyframes } from '@emotion/css'
import { observer } from 'mobx-react-lite'
import getColorPrimary from '../../../getColorPrimary'

interface EditProps extends Omit<InputProps, 'value' | 'onChange'> {
  value?: string
  onChange?: Dispatch<string>
}

const Edit = observer<EditProps>(({ value, onChange, ...restProps }) => {
  const ref = useRef<InputRef>(null)

  const flash = keyframes`
  from { 
    border: 1px solid ${getColorPrimary()};
  }
  to {
    border: 1px solid currentColor;
  }
`

  const input = css`
  &:focus {
    animation-name: ${flash};
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-timing-function: ease-in-out;
  }
`

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = ({ target, code }) => {
    if (document.activeElement === target) {
      onChange?.(code)
      ref.current?.blur()
    }
  }

  return (
    <Input
      {...restProps}
      ref={ref}
      readOnly
      value={value ?? 'Focus to set key'}
      className={input}
      onKeyDown={handleKeyDown}
    />
  )
})

export default Edit
