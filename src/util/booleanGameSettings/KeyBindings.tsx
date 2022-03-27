import { observer } from 'mobx-react-lite'
import KeyBindingInput from '../KeyBindingInput'
import { Button } from 'antd'
import { action } from 'mobx'
import { DeleteOutlined } from '@ant-design/icons'
import { css } from '@emotion/css'
import { useState } from 'react'

export interface KeyBindingsProps {
  keyboard: Set<string>
}

const KeyBindings = observer<KeyBindingsProps>(({ keyboard }) => {
  const [addedNewInput, setAddedNewInput] = useState(false)

  return (
    <>
      {[...keyboard].map((key, index) =>
        <div key={key} className={css({ display: 'flex' })}>
          <KeyBindingInput
            value={key}
            onChange={action(newKey => {
              keyboard.delete(key)
              keyboard.add(newKey)
            })}
            autoFocus={addedNewInput && index === keyboard.size - 1}
            onBlur={() => setAddedNewInput(false)}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={action(() => {
              keyboard.delete(key)
            })}
          />
        </div>)}
      <Button
        onClick={action(() => {
          keyboard.add('')
          setAddedNewInput(true)
        })}
      >
        Add Another Key
      </Button>
    </>
  )
})

export default KeyBindings
