import { FC, ReactNode } from 'react'
import Size from '../../types/Size'
import TouchButtons from '../../action-inputs/TouchButtons'
import LoadedGameNotPauseable from './LoadedGameNotPauseable'
import LoadedGamePauseable from './LoadedGamePauseable'
import { GameSettings } from '../useGameSettings'
import { UseScreenResult } from '../useScreen'

export interface LoadedGameInputs<Action extends string = string> {
  touchButtons: TouchButtons<Action>
  back: Action
}

export interface LoadedGameProps<Action extends string = string> {
  gameSettings: GameSettings
  size: Size
  children: ReactNode
  inputs?: LoadedGameInputs<Action>
  useScreenResult?: UseScreenResult
}

const LoadedGame: FC<LoadedGameProps> = <Action extends string = string>(
  props: LoadedGameProps<Action>
) => {
  const {
    children,
    size,
    inputs,
    gameSettings,
    useScreenResult
  } = props

  return (
    <>
      {inputs !== undefined
        ? (
          <LoadedGamePauseable
            {...{ inputs, gameSettings, size, useScreenResult }}
          >
            {children}
          </LoadedGamePauseable>)
        : <LoadedGameNotPauseable>{children}</LoadedGameNotPauseable>}
    </>
  )
}

export default LoadedGame
