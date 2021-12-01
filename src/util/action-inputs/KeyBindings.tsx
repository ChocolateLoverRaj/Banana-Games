import { observer } from 'mobx-react-lite'
import KeyBindingInput from '../KeyBindingInput'
import { Button } from 'antd'
import { action } from 'mobx'
import { DeleteOutlined } from '@ant-design/icons'
import { css } from '@emotion/css'

export interface KeyBindingsProps {
  keyboard: Set<string>
}

const KeyBindings = observer<KeyBindingsProps>(({ keyboard }) => {
  return (
    <>
      {[...keyboard].map(key =>
        <div key={key} className={css({ display: 'flex' })}>
          <KeyBindingInput
            value={key}
            onChange={action(newKey => {
              keyboard.delete(key)
              keyboard.add(newKey)
            })}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={action(() => {
              keyboard.delete(key)
            })}
          />
        </div>)}
      <Button onClick={action(() => {
        keyboard.add('')
      })}
      >
        Add Another Key
      </Button>
    </>
  )
})

export default KeyBindings
