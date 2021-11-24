import { Dispatch, FC, KeyboardEventHandler, useRef } from 'react'
import { Input } from 'antd'
import { css, keyframes } from '@emotion/css'

interface KeyBindingInputProps {
  value?: string
  onChange?: Dispatch<string>
}

const flash = keyframes`
  from { 
    border: 1px solid #1890ff;
  }
  to {
    border: 1px solid white;
  }
`

const input = css`
  &:focus {
    animation-name: ${flash};
    animation-duration: 0.5s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }
`

const KeyBindingsInput: FC<KeyBindingInputProps> = props => {
  const { value, onChange } = props

  const ref = useRef<Input>(null)

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = ({ target, code }) => {
    if (document.activeElement === target) {
      onChange?.(code)
      ref.current?.blur()
    }
  }

  return <Input ref={ref} readOnly value={value} className={input} onKeyDown={handleKeyDown} />
}

export default KeyBindingsInput
