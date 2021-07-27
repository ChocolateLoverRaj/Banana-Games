import { FC, ReactNode } from 'react'

export interface LoadedGameNotPauseableProps {
  children: ReactNode
}

const LoadedGameNotPauseable: FC<LoadedGameNotPauseableProps> = props => {
  const { children } = props

  return <div>{children}</div>
}

export default LoadedGameNotPauseable
