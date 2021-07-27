import { FC, useEffect, ReactNode } from 'react'
import { ActionInputs } from '../action-inputs'
import { Screen, UseScreenResult } from './useScreen'
import useVisible from '../useVisible'
import Size from '../types/Size'
import TouchButtons from '../action-inputs/TouchButtons'
import LoadedGameNotPauseable from './LoadedGameNotPauseable'
import LoadedGamePauseable from './LoadedGamePauseable'

export interface LoadedGameInputs<Action extends string = string> {
  actionInputs: ActionInputs<Action>
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
  pausedWhenNotVisible: boolean
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
    pausedWhenNotVisible
  } = props

  const [screen, setScreen] = useScreenResult
  const visible = useVisible()

  useEffect(() => {
    if (!visible && pausedWhenNotVisible && screen === Screen.PLAYING) setScreen(Screen.PAUSED)
  }, [pausedWhenNotVisible, visible])

  return (
    <>
      {inputs !== undefined
        ? (
          <LoadedGamePauseable {...{ inputs, pausedWhenNotVisible, size, useScreenResult }}>
            {children}
          </LoadedGamePauseable>)
        : <LoadedGameNotPauseable>{children}</LoadedGameNotPauseable>}
    </>
  )
}

export default LoadedGame
