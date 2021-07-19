import { forwardRef, useEffect, useState } from 'react'
import GameComponent from '../../types/GameComponent'
import { game, paused as pausedStyle } from './index.module.scss'
import { Typography, Form, Switch } from 'antd'
import PausedMenu from '../../PausedMenu'
import useVisible from '../../util/useVisible'
import arrayJoin from '../../util/arrayJoin'
import { SettingOutlined } from '@ant-design/icons'
import { ActionKeys, ActionKeysConfig, useCurrentKeys, useOnAction } from '../../util/action-keys'
import { Map, Set } from 'immutable'

type Action = 'back'

const actionKeys = new ActionKeys<Action>(Map([['back', Set.of('Escape', 'KeyP')]]))

const MenuGame: GameComponent = forwardRef((_props, ref) => {
  const [paused, setPaused] = useState(false)
  const [pausedWhenNotVisible, setPausedWhenNotVisible] = useState(true)
  const visible = useVisible()
  const [currentKeys] = useCurrentKeys(actionKeys)

  useEffect(() => {
    if (!visible && pausedWhenNotVisible) setPaused(true)
  }, [pausedWhenNotVisible, visible])

  useOnAction(actionKeys, 'back', () => {
    if (!paused) setPaused(true)
  })

  const handleValuesChange = ({ pausedWhenNotVisible }): void =>
    setPausedWhenNotVisible(pausedWhenNotVisible)

  const backKeys = currentKeys.get('back') as Set<string>

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
                  <>
                    <Form initialValues={{ pausedWhenNotVisible }} onValuesChange={handleValuesChange}>
                      <Form.Item
                        name='pausedWhenNotVisible'
                        label='Paused When Not Visible'
                        valuePropName='checked'
                      >
                        <Switch />
                      </Form.Item>
                    </Form>
                    <ActionKeysConfig {...{ actionKeys }} />
                  </>
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
