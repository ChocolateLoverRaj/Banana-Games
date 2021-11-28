import { Spin } from 'antd'
import { FC, ReactNode } from 'react'
import ErrorResult from '../../ErrorResult'
import Size from '../types/Size'
import LoadedGame, { LoadedGameInputs } from './loaded-game'
import useGameSettings from './useGameSettings'
import { UseScreenResult } from './useScreen'

export interface BaseGameProps<Action extends string = string> {
  inputs?: LoadedGameInputs<Action>
  size: Size
  children: ReactNode
  useScreenResult?: UseScreenResult
}

const BaseGame: FC<BaseGameProps> = <Action extends string = string>(
  props: BaseGameProps<Action>
) => {
  const { inputs, size, children, useScreenResult } = props

  const [gameSettings, error] = useGameSettings()

  return (
    <>
      {gameSettings !== undefined
        ? (
          <LoadedGame {...{ inputs, gameSettings, size, useScreenResult }}>
            {children}
          </LoadedGame>)
        : error === undefined
          ? <Spin tip='Loading Settings' size='large' />
          : <ErrorResult error={error} title='Error Loading Settings' />}
    </>
  )
}

export default BaseGame
