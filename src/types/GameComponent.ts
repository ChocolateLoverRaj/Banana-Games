import { ForwardRefExoticComponent, PropsWithoutRef, RefAttributes, ReactNode } from 'react'

type GameComponent =
  ForwardRefExoticComponent<PropsWithoutRef<{}> & RefAttributes<HTMLDivElement | null>> & {
    description?: ReactNode
  }

export default GameComponent
