import { forwardRef, useEffect, useState } from 'react'
import GameComponent from '../../types/GameComponent'
import { game, paused as pausedStyle } from './index.module.scss'
import { Typography } from 'antd'
import PausedMenu from '../../PausedMenu'
import useVisible from '../../util/useVisible'
import arrayJoin from '../../util/arrayJoin'
import { SettingOutlined } from '@ant-design/icons'
import { ActionInputs, ActionKeysConfig, useCurrentInputs, useOnAction } from '../../util/action-inputs'
import { Map, Set } from 'immutable'
import usePromise from 'react-use-promise'
import { useTransaction } from '../../util/use-indexed-db'
import settingsDb from '../../settingsDb'
import never from 'never'

type Action = 'back'

const actionKeys = new ActionInputs<Action>(Map([['back', {
  keyboard: Set.of('Escape', 'KeyP'),
  touch: {
    buttonContents: '',
    buttons: Set.of()
  }
}]]))

const MenuGame: GameComponent = forwardRef((_props, ref) => {
  const [paused, setPaused] = useState(false)
  const visible = useVisible()
  const [currentInputs] = useCurrentInputs(actionKeys)
  // TODO: Show loading
  const createTransaction = useTransaction(settingsDb)
  const [pausedWhenNotVisible] = usePromise<boolean>(async () => await
  (await createTransaction(['settings'], 'readonly')).objectStore('settings')
    .get?.('pausedWhenNotVisible') ?? never('No value for key pausedWhenNotVisible'),
  [createTransaction])

  useEffect(() => {
    if (!visible && pausedWhenNotVisible === true) setPaused(true)
  }, [pausedWhenNotVisible, visible])

  useOnAction(actionKeys, undefined, 'back', () => {
    if (!paused) setPaused(true)
  })

  const backKeys = currentInputs.get('back')?.keyboard as Set<string>

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
                content: <ActionKeysConfig {...{ actionInputs: actionKeys }} />,
                icon: <SettingOutlined />
              }]}
            </PausedMenu>

          </div>
        </div>
      )}
    </div>
  )
})

MenuGame.description = (
  <>
    <Typography.Paragraph>
      One key feature a game needs is a pause button. Besides pausing the game, a pause screen
      can lead to many more buttons and screens, for editing settings, viewing stats, and more.
    </Typography.Paragraph>
    <Typography.Paragraph>
      Games are automatically paused when the current tab stops being visible using the {' '}
      <a href='https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API'>
        Page Visibility API
      </a>. You can disable this in the settings.
    </Typography.Paragraph>
  </>
)

export default MenuGame
