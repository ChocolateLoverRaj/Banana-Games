import { forwardRef, useEffect, useState } from 'react'
import GameComponent from '../../types/GameComponent'
import { game, paused as pausedStyle } from './index.module.scss'
import { Typography, Form, Switch } from 'antd'
import PausedMenu from '../../PausedMenu'
import useVisible from '../../util/useVisible'
import arrayJoin from '../../util/arrayJoin'
import { SettingOutlined } from '@ant-design/icons'

const backKeys = new Set<string>().add('ShiftRight').add('Escape')

const MenuGame: GameComponent = forwardRef((_props, ref) => {
  const [paused, setPaused] = useState(false)
  const [pausedWhenNotVisible, setPausedWhenNotVisible] = useState(true)
  const visible = useVisible()

  useEffect(() => {
    if (!visible && pausedWhenNotVisible) setPaused(true)
  }, [pausedWhenNotVisible, visible])

  useEffect(() => {
    if (!paused) {
      const handler = (e: KeyboardEvent): void => {
        if (backKeys.has(e.code)) setPaused(true)
      }
      addEventListener('keydown', handler)
      return () => removeEventListener('keydown', handler)
    }
  }, [paused])

  const handleValuesChange = ({ pausedWhenNotVisible }): void =>
    setPausedWhenNotVisible(pausedWhenNotVisible)

  return (
    <div ref={ref} className={game}>
      <div>
        <h1>{paused ? 'Game Blurred' : 'Playing Game'}</h1>
        Press {arrayJoin([...backKeys].map(key =>
          <Typography.Text keyboard key={key}>{key}</Typography.Text>), ' or ')} to {' '}
        {paused ? 'resume' : 'pause'} game
      </div>
      {paused && (
        <div className={pausedStyle}>
          <div>
            <PausedMenu onClose={setPaused.bind(undefined, false)} {...{ backKeys }}>
              {[{
                title: 'Settings',
                content: (
                  <Form initialValues={{ pausedWhenNotVisible }} onValuesChange={handleValuesChange}>
                    <Form.Item
                      name='pausedWhenNotVisible'
                      label='Paused When Not Visible'
                      valuePropName='checked'
                    >
                      <Switch />
                    </Form.Item>
                  </Form>
                ),
                icon: <SettingOutlined />
              }]}
            </PausedMenu>

          </div>
        </div>
      )}
    </div>
  )
})

export default MenuGame
