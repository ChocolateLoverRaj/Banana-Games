import { forwardRef, useEffect, useState } from 'react'
import GameComponent from '../../types/GameComponent'
import { game, paused as pausedStyle } from './index.module.scss'
import { Typography } from 'antd'
import PausedMenu from './PausedMenu'
import useVisible from '../../util/useVisible'
import arrayJoin from '../../util/arrayJoin'

const backKeys = new Set<string>().add('ShiftRight').add('Escape')

const MenuGame: GameComponent = forwardRef((_props, ref) => {
  const [paused, setPaused] = useState(false)
  const pausedWhenNotVisibleTuple = useState(true)
  const visible = useVisible()

  const [pausedWhenNotVisible] = pausedWhenNotVisibleTuple

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
            <PausedMenu
              onClose={setPaused.bind(undefined, false)}
              pauseWhenNotVisible={pausedWhenNotVisibleTuple}
              {...{ backKeys }}
            />
          </div>
        </div>
      )}
    </div>
  )
})

export default MenuGame
