import { Spin } from 'antd'
import { FC, ReactNode, RefObject } from 'react'
import ErrorResult from '../../ErrorResult'
import { GameSetting } from '../game-setting'
import Size from '../types/Size'
import LoadedGame from './loaded-game'
import Screen from './Screen'
import useGameSettings from './useGameSettings'

export interface BaseGameProps {
  size: Size
  children: ReactNode
  settings: ReadonlyArray<GameSetting<any, any>>
  containerRef: RefObject<HTMLDivElement>
  screen?: Screen
}

const BaseGame: FC<BaseGameProps> = props => {
  const [allGameSettings, error] = useGameSettings()

  return (
    <>
      {allGameSettings !== undefined
        ? (
          <LoadedGame
            {...props}
            allGameSettings={allGameSettings}
          />)
        : error === undefined
          ? <Spin tip='Loading Settings' size='large' />
          : <ErrorResult error={error} title='Error Loading Settings' />}
    </>
  )
}

export default BaseGame
