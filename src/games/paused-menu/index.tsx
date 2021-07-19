import { forwardRef, useEffect, useState } from 'react'
import GameComponent from '../../types/GameComponent'
import { game, paused as pausedStyle } from './index.module.scss'
import { Typography } from 'antd'
import PausedMenu from './PausedMenu'
import useVisible from '../../util/useVisible'

const pauseKey = 'ShiftRight'

const MenuGame: GameComponent = forwardRef((_props, ref) => {
  const [paused, setPaused] = useState(false)
  const pausedWhenNotVisibleTuple = useState(true)
  const visible = useVisible()

  const [pausedWhenNotVisible] = pausedWhenNotVisibleTuple

  useEffect(() => {
    if (!visible && pausedWhenNotVisible) setPaused(true)
  }, [pausedWhenNotVisible, visible])

  useEffect(() => {
    const handler = (e: KeyboardEvent): void => {
      if (e.code === pauseKey) setPaused(!paused)
    }
    addEventListener('keydown', handler)
    return () => removeEventListener('keydown', handler)
  })

  return (
    <div ref={ref} className={game}>
      <div>
        <h1>{paused ? 'Game Blurred' : 'Playing Game'}</h1>
        Press <Typography.Text keyboard>{pauseKey}</Typography.Text> to {paused ? 'resume' : 'pause'} game
      </div>
      {paused && (
        <div className={pausedStyle}>
          <div>
            <PausedMenu
              onClose={setPaused.bind(undefined, false)}
              pauseWhenNotVisible={pausedWhenNotVisibleTuple}
            />
          </div>
        </div>
      )}
    </div>
  )
})

export default MenuGame
