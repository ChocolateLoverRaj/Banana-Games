import { Radio } from 'antd'
import { observer } from 'mobx-react-lite'
import theme from './theme'
import { action } from 'mobx'

const ThemeChooser = observer(() => (
  <label>
    Theme:{' '}
    <Radio.Group
      value={theme.selectedTheme ?? 'auto'}
      onChange={action(({ target: { value } }) => {
        theme.selectedTheme = value === 'auto' ? undefined : value
      })}
    >
      <Radio value='auto'>Auto</Radio>
      <Radio value='dark'>Dark</Radio>
      <Radio value='light'>Light</Radio>
    </Radio.Group>
  </label>
))

export default ThemeChooser
