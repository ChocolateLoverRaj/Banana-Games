import { FC, ReactNode } from 'react'
import { UseScreenResult } from '../useScreen'
import Size from '../../types/Size'
import TouchButtons from '../../action-inputs/TouchButtons'
import LoadedGameNotPauseable from './LoadedGameNotPauseable'
import LoadedGamePauseable from './LoadedGamePauseable'
import { GameSettings } from '../useGameSettings'

export interface LoadedGameInputs<Action extends string = string> {
  touchButtons: TouchButtons<Action>
  back: Action
}

export interface LoadedGameOptionalConfig<Action extends string = string> {
  inputs: LoadedGameInputs<Action>
}

export interface LoadedGameRequiredConfig {
  useScreenResult: UseScreenResult
}

export interface LoadedGameConfig <Action extends string = string> extends
  Partial<LoadedGameOptionalConfig<Action>>, LoadedGameRequiredConfig {}

export interface LoadedGameRequiredProps extends
  LoadedGameRequiredConfig {
  gameSettings: GameSettings
  size: Size
  children: ReactNode
}

export interface LoadedGameProps<Action extends string = string> extends
  LoadedGameRequiredProps,
  Partial<LoadedGameOptionalConfig<Action>> {}

const LoadedGame: FC<LoadedGameProps> = <Action extends string = string>(
  props: LoadedGameProps<Action>
) => {
  const {
    children,
    size,
    inputs,
    useScreenResult,
    gameSettings,
    gameSettings: { touchScreen }
  } = props

  return (
    <>
      {inputs !== undefined
        ? (
          <LoadedGamePauseable
            {...{ inputs, gameSettings, size, useScreenResult, touchScreen }}
          >
            {children}
          </LoadedGamePauseable>)
        : <LoadedGameNotPauseable>{children}</LoadedGameNotPauseable>}
    </>
  )
}

export default LoadedGame
