import { forwardRef, ReactNode } from 'react'
import Size from '../types/Size'
import useComponentSize from '@rehooks/component-size'
import FixedAspectRatioContainer from './FixedAspectRatioContainer'
import DynamicAspectRatioContainer from './DynamicAspectRatioContainer'
import BaseGame from './BaseGame'
import { GameSetting } from '../gameSetting'
import Screen from './Screen'

export interface GameWithActionsProps {
  settings?: ReadonlyArray<GameSetting<any, any>>
  screen?: Screen
  aspectRatio?: Size
  children: ReactNode
  className?: string
}

const GameWithActions = forwardRef<HTMLDivElement, GameWithActionsProps>(({
  settings = [],
  aspectRatio,
  children,
  className,
  screen
}, ref) => {
  const size = useComponentSize(ref as any)

  const baseGame = (
    <BaseGame
      {...{ settings, size, screen }}
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
