import { forwardRef, MouseEventHandler, useEffect } from 'react'
import * as React from 'react'
import { Button } from 'antd'
import useFullScreen, { FullScreenOperation } from '../../util/useFullScreen'
import { game } from './index.module.scss'
import GameComponent from '../../types/GameComponent'

const FullScreenGame: GameComponent = forwardRef((_props, ref) => {
  const [fullScreen, setFullScreen, operation, error] = useFullScreen(ref as any)
  useEffect(() => {
    // eslint-disable-next-line no-extra-boolean-cast
    if (Boolean(error)) console.error(error)
  }, [error])

  const handleEnter: MouseEventHandler = () => setFullScreen(true)
  const handleExit: MouseEventHandler = () => setFullScreen(false)

  return (
    <div ref={ref} className={game}>
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
})

export default FullScreenGame
