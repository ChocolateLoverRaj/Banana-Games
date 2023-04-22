import { observer } from 'mobx-react-lite'
import { ColorPicker } from '@programmerraj/rc-color-picker'
import { useState } from 'react'
import getColorPrimary from './getColorPrimary'
import color from 'tinycolor2'
import '@programmerraj/rc-color-picker/assets/index.css'
import localStorage from 'mobx-localstorage'
import colorPrimaryKey from './colorPrimaryKey'
import { Button } from 'antd'

const PrimaryColorChooser = observer(() => {
  const value = getColorPrimary()
  const [open, setOpen] = useState(false)

  return (
    <>
      <label>
        Primary Color:
        <ColorPicker
          value={{ color: color(value), open: open }}
          onChange={({ color, open }) => {
            localStorage.setItem(colorPrimaryKey, color.toHex())
            setOpen(open)
          }}
        />
      </label>
      <Button
        onClick={() => localStorage.removeItem(colorPrimaryKey)}
      >
        Reset
      </Button>
    </>
  )
})

export default PrimaryColorChooser
