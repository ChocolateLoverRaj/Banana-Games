import { forwardRef, ReactNode } from 'react'
import Size from '../types/Size'
import useComponentSize from '@rehooks/component-size'
import FixedAspectRatioContainer from './FixedAspectRatioContainer'
import DynamicAspectRatioContainer from './DynamicAspectRatioContainer'
import BaseGame from './BaseGame'
import { UseScreenResult } from './useScreen'
import { GameSetting } from '../game-setting'
import PauseEmitter from '../PauseEmitter'

export interface GameWithActionsProps {
  settings?: GameSetting[]
  pauseEmitter?: PauseEmitter
  useScreenResult?: UseScreenResult
  aspectRatio?: Size
  children: ReactNode
  className?: string
}

const GameWithActions = forwardRef<HTMLDivElement, GameWithActionsProps>(({
  settings = [],
  aspectRatio,
  children,
  className,
  useScreenResult,
  pauseEmitter
}, ref) => {
  const size = useComponentSize(ref as any)

  const baseGame = (
    <BaseGame {...{ settings, pauseEmitter, size, useScreenResult }}>{children}</BaseGame>)

  return (
    <>
      {aspectRatio !== undefined
        ? (
          <FixedAspectRatioContainer
            {...{ aspectRatio, size, className }}
            ref={ref}
          >
            {baseGame}
          </FixedAspectRatioContainer>)
        : (
          <DynamicAspectRatioContainer {...{ className }} ref={ref}>
            {baseGame}
          </DynamicAspectRatioContainer>)}
    </>
  )
})

export default GameWithActions
