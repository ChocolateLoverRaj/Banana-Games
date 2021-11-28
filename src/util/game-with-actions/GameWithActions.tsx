import { forwardRef, ReactNode } from 'react'
import Size from '../types/Size'
import { LoadedGameInputs } from './loaded-game'
import useComponentSize from '@rehooks/component-size'
import FixedAspectRatioContainer from './FixedAspectRatioContainer'
import DynamicAspectRatioContainer from './DynamicAspectRatioContainer'
import BaseGame from './BaseGame'
import { UseScreenResult } from './useScreen'

export interface GameWithActionsProps<Action extends string = string> {
  inputs?: LoadedGameInputs<Action>
  useScreenResult?: UseScreenResult
  aspectRatio?: Size
  children: ReactNode
  className?: string
}

const GameWithActions = forwardRef<HTMLDivElement, GameWithActionsProps>((props, ref) => {
  const { inputs, aspectRatio, children, className, useScreenResult } = props

  const size = useComponentSize(ref as any)

  const baseGame = <BaseGame {...{ inputs, size, useScreenResult }}>{children}</BaseGame>

  return (
    <>
      {aspectRatio !== undefined
        ? (
          <FixedAspectRatioContainer
            {...{ aspectRatio, size, inputs, className }}
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
