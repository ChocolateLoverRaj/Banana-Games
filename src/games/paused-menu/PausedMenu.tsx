import { Dispatch, FC, useState, useEffect } from 'react'
import { Button, Space, Switch, Form } from 'antd'

export type OnClose = () => void
export interface PausedMenuProps {
  onClose: OnClose
  pauseWhenNotVisible: [boolean, Dispatch<boolean>]
  backKeys: Set<string>
}

const PausedMenu: FC<PausedMenuProps> = props => {
  const {
    onClose,
    pauseWhenNotVisible: [pausedWhenNotVisible, setPausedWhenNotVisible],
    backKeys
  } = props

  const [settingsPage, setSettingsPage] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent): void => {
      if (backKeys.has(e.code)) {
        if (settingsPage) setSettingsPage(false)
        else onClose()
      }
    }
    addEventListener('keydown', handler)
    return () => removeEventListener('keydown', handler)
  }, [settingsPage, backKeys, onClose])

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
