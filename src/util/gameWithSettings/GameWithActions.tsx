import { forwardRef, ReactNode } from 'react'
import Size from '../types/Size'
import useComponentSize from '@rehooks/component-size'
import FixedAspectRatioContainer from './FixedAspectRatioContainer'
import DynamicAspectRatioContainer from './DynamicAspectRatioContainer'
import BaseGame from './BaseGame'
import { UseGameWithSettingsResult } from './useGameWithSettings'

export interface GameWithActionsProps {
  game: UseGameWithSettingsResult
  aspectRatio?: Size
  children: ReactNode
  className?: string
}

const GameWithActions = forwardRef<HTMLDivElement, GameWithActionsProps>(({
  aspectRatio,
  children,
  className,
  game
}, ref) => {
  const size = useComponentSize(ref as any)

  const baseGame = (
    <BaseGame
      {...{ game, size, screen }}
      containerRef={ref as any}
    >
      {children}
    </BaseGame>
  )

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
