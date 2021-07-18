import { Dispatch, FC, KeyboardEventHandler } from 'react'
import { Input } from 'antd'
import { input } from './KeyBindingInput.module.scss'

interface KeyBindingInputProps {
  value?: string
  onChange?: Dispatch<string>
}

const KeyBindingsInput: FC<KeyBindingInputProps> = props => {
  const { value, onChange } = props

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = ({ target, key }) => {
    if (document.activeElement === target) onChange?.(key)
  }

  return <Input readOnly value={value} className={input} onKeyDown={handleKeyDown} />
}

export default KeyBindingsInput
