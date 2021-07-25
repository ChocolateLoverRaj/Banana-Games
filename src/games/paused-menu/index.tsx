import { forwardRef } from 'react'
import GameComponent from '../../types/GameComponent'
import { game } from './index.module.scss'
import { Typography, Spin } from 'antd'
import usePromise from 'react-use-promise'
import { useTransaction } from '../../util/use-indexed-db'
import settingsDb from '../../settingsDb'
import never from 'never'
import Game from './Game'
import ErrorResult from '../../ErrorResult'

const MenuGame: GameComponent = forwardRef((_props, ref) => {
  const createTransaction = useTransaction(settingsDb)
  const [pausedWhenNotVisible, error] = usePromise<boolean>(async () => await
  (await createTransaction(['settings'], 'readonly')).objectStore('settings')
    .get?.('pausedWhenNotVisible') ?? never('No value for key pausedWhenNotVisible'),
  [createTransaction])

  return (
    <div ref={ref} className={game}>
      {pausedWhenNotVisible !== undefined
        ? <Game {...{ pausedWhenNotVisible }} />
        : error === undefined
          ? <Spin tip='Loading Settings' size='large' />
          : <ErrorResult error={error} title='Error Loading Settings' />}
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
