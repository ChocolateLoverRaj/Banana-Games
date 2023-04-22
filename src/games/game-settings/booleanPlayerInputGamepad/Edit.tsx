import { Dispatch, useEffect, useRef } from 'react'
import { Input, InputProps, InputRef } from 'antd'
import { css, keyframes } from '@emotion/css'
import { observer } from 'mobx-react-lite'
import getColorPrimary from '../../../getColorPrimary'
import { GamepadListener } from 'gamepad.js'

interface EditProps extends Omit<InputProps, 'value' | 'onChange'> {
  value?: number
  onChange?: Dispatch<number>
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

  // TODO: Only listen for gamepad when it's focused
  useEffect(() => {
    const gamepadListener = new GamepadListener()
    gamepadListener.on('gamepad:button', ({ detail: { button, pressed } }): void => {
      if (document.activeElement === ref.current?.input && pressed as boolean) {
        onChange?.(button)
        ref.current.blur()
      }
    })
    gamepadListener.start()
    return () => {
      gamepadListener.stop()
    }
  }, [])

  return (
    <Input
      {...restProps}
      ref={ref}
      readOnly
      value={value !== -1 ? value : 'Focus to set button'}
      className={input}
    />
  )
})

export default Edit
