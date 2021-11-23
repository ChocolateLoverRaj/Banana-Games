import { Typography } from 'antd'
import GameComponent from '../../types/GameComponent'
import { HashLink } from 'react-router-hash-link'
import closeTabShortcut from './closeTabShortcut.json'
import { css } from '@emotion/css'
import getBackgroundColor from '../../getBackgroundColor'
import { observer } from 'mobx-react-lite'

export const Game: GameComponent = observer((_props, ref) => (
  <div ref={ref} className={css({ backgroundColor: getBackgroundColor() })}>
    <Typography.Title>Game</Typography.Title>
  </div>
), { forwardRef: true })

export const description = (
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
