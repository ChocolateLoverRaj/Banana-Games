import { ForwardRefExoticComponent, PropsWithoutRef, RefAttributes } from 'react'

type GameComponent =
  ForwardRefExoticComponent<PropsWithoutRef<{}> & RefAttributes<HTMLDivElement | null>>

export default GameComponent
