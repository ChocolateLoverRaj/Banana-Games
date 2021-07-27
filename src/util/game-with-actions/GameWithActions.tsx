import { forwardRef, ReactNode } from 'react'
import Size from '../types/Size'
import { LoadedGameConfig } from './LoadedGame'
import useComponentSize from '@rehooks/component-size'
import FixedAspectRatio from './FixedAspectRatio'
import DynamicAspectRatio from './DynamicAspectRatio'

export interface GameWithActionsProps<Action extends string = string> {
  loadedGameConfig: LoadedGameConfig<Action>
  aspectRatio?: Size
  children: ReactNode
  className?: string
}

const GameWithActions = forwardRef<HTMLDivElement, GameWithActionsProps>((props, ref) => {
  const { loadedGameConfig, aspectRatio, children, className } = props

  const size = useComponentSize(ref as any)

  return (
    <>
      {aspectRatio !== undefined
        ? (
          <FixedAspectRatio {...{ aspectRatio, size, loadedGameConfig, className }} ref={ref}>
            {children}
          </FixedAspectRatio>)
        : (
          <DynamicAspectRatio {...{ size, loadedGameConfig, className }} ref={ref}>
            {children}
          </DynamicAspectRatio>)}
    </>
  )
})

export default GameWithActions
