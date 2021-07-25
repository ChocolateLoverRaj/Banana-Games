import { forwardRef } from 'react'
import * as React from 'react'
import { Typography } from 'antd'
import { game } from './index.module.scss'
import GameComponent from '../../types/GameComponent'
import WarnLeaveGame from '../../WarnLeaveGame'
import { HashLink } from 'react-router-hash-link'
import closeTabShortcut from './closeTabShortcut.json'

const FullScreenGame: GameComponent = forwardRef((_props, ref) => (
  <>
    <WarnLeaveGame />
    <div ref={ref} className={game}>
      <Typography.Title>Game</Typography.Title>
    </div>
  </>
))

FullScreenGame.description = (
  <Typography.Paragraph>
    You might accidentally leave a game by pressing {' '}
    <a href={closeTabShortcut}>
      <Typography.Text keyboard>Ctrl</Typography.Text> + {' '}
      <Typography.Text keyboard>W</Typography.Text>
    </a>, or clicking on a different route on the menu. To prevent this, the
    <a href='https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event'>
      <Typography.Text code>beforeunload</Typography.Text> event
    </a> is used. You can disable this in the {' '}
    <HashLink smooth to='/settings#warnBeforeLeavingGame'>
      settings
    </HashLink>.
  </Typography.Paragraph>
)

export default FullScreenGame
