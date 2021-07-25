import { FC, useEffect, useState } from 'react'
import { paused as pausedStyle } from './index.module.scss'
import { Typography } from 'antd'
import PausedMenu from '../../PausedMenu'
import useVisible from '../../util/useVisible'
import arrayJoin from '../../util/arrayJoin'
import { SettingOutlined } from '@ant-design/icons'
import { ActionInputs, ActionKeysConfig, useCurrentInputs, useOnAction } from '../../util/action-inputs'
import { Map, Set } from 'immutable'

export interface GameProps {
  pausedWhenNotVisible: boolean
}

type Action = 'back'

const actionKeys = new ActionInputs<Action>(Map([['back', {
  keyboard: Set.of('Escape', 'KeyP'),
  touch: {
    buttonContents: '',
    buttons: Set.of()
  }
}]]))

const Game: FC<GameProps> = props => {
  const { pausedWhenNotVisible } = props

  const [paused, setPaused] = useState(false)
  const visible = useVisible()
  const [currentInputs] = useCurrentInputs(actionKeys)

  useEffect(() => {
    if (!visible && pausedWhenNotVisible) setPaused(true)
  }, [pausedWhenNotVisible, visible])

  useOnAction(actionKeys, undefined, 'back', () => {
    if (!paused) setPaused(true)
  })

  const backKeys = currentInputs.get('back')?.keyboard as Set<string>

  return (
    <>
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
                content: <ActionKeysConfig {...{ actionInputs: actionKeys }} />,
                icon: <SettingOutlined />
              }]}
            </PausedMenu>

          </div>
        </div>
      )}
    </>
  )
}

export default Game
