import { Spin } from 'antd'
import { FC, ReactNode } from 'react'
import ErrorResult from '../../ErrorResult'
import Size from '../types/Size'
import LoadedGame, { LoadedGameConfig } from './loaded-game'
import useGameSettings from './useGameSettings'

export interface BaseGameProps<Action extends string = string> {
  loadedGameConfig: LoadedGameConfig<Action>
  size: Size
  children: ReactNode
}

const BaseGame: FC<BaseGameProps> = <Action extends string = string>(
  props: BaseGameProps<Action>
) => {
  const { loadedGameConfig, size, children } = props

  const [gameSettings, error] = useGameSettings()

  return (
    <>
      {gameSettings !== undefined
        ? (
          <LoadedGame {...loadedGameConfig} {...{ gameSettings, size }}>
            {children}
          </LoadedGame>)
        : error === undefined
          ? <Spin tip='Loading Settings' size='large' />
          : <ErrorResult error={error} title='Error Loading Settings' />}
    </>
  )
}

export default BaseGame
