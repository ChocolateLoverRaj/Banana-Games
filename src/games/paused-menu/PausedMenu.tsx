import { Dispatch, FC, useState } from 'react'
import { Button, Space, Switch, Form } from 'antd'

export type OnClose = () => void
export interface PausedMenuProps {
  onClose: OnClose
  pauseWhenNotVisible: [boolean, Dispatch<boolean>]
}

const PausedMenu: FC<PausedMenuProps> = props => {
  const { onClose, pauseWhenNotVisible: [pausedWhenNotVisible, setPausedWhenNotVisible] } = props

  const [settingsPage, setSettingsPage] = useState(false)

  const handleValuesChange = ({ pausedWhenNotVisible }): void =>
    setPausedWhenNotVisible(pausedWhenNotVisible)

  return (
    <>
      <h1>{settingsPage ? 'Settings' : 'Paused Menu'}</h1>
      {settingsPage
        ? (
          <Space direction='vertical'>
            <Form initialValues={{ pausedWhenNotVisible }} onValuesChange={handleValuesChange}>
              <Form.Item
                name='pausedWhenNotVisible'
                label='Paused When Not Visible'
                valuePropName='checked'
              >
                <Switch />
              </Form.Item>
            </Form>
            <Button onClick={setSettingsPage.bind(undefined, false)}>Back</Button>
          </Space>
          )
        : (
          <Space direction='vertical'>
            <Button onClick={setSettingsPage.bind(undefined, true)}>Settings</Button>
            <Button onClick={onClose}>Resume</Button>
          </Space>
          )}
    </>
  )
}

export default PausedMenu
