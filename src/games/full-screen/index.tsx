import { MouseEventHandler, useEffect } from 'react'
import * as React from 'react'
import { Button, Typography } from 'antd'
import useFullScreen, { FullScreenOperation } from '../../util/useFullScreen'
import GameComponent from '../../types/GameComponent'
import { css } from '@emotion/css'
import getBackgroundColor from '../../getBackgroundColor'
import { observer } from 'mobx-react-lite'

const FullScreenGame: GameComponent = observer((_props, ref) => {
  const [fullScreen, setFullScreen, operation, error] = useFullScreen(ref as any)
  useEffect(() => {
    // eslint-disable-next-line no-extra-boolean-cast
    if (Boolean(error)) console.error(error)
  }, [error])

  const handleEnter: MouseEventHandler = () => setFullScreen(true)
  const handleExit: MouseEventHandler = () => setFullScreen(false)

  return (
    <div ref={ref} className={css({ backgroundColor: getBackgroundColor() })}>
      {fullScreen
        ? (
          <Button onClick={handleExit} loading={operation === FullScreenOperation.EXITING}>
            Exit Full Screen
          </Button>
          )
        : (
          <Button onClick={handleEnter} loading={operation === FullScreenOperation.ENTERING}>
            Enter Full Screen
          </Button>
          )}
    </div>
  )
}, { forwardRef: true })

FullScreenGame.description = (
  <Typography.Paragraph>
    Even with the game in the spotlight of the screen, there is a lot of potential for the game
    to have more space. Using the {' '}
    <a href='https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API'>Fullscreen API</a>,
    you can have a better view of the game.
  </Typography.Paragraph>
)

export default FullScreenGame
