import * as React from 'react'
import { forwardRef } from 'react'
import useComponentSize from '@rehooks/component-size'
import { game } from './index.module.scss'
import GameComponent from '../../types/GameComponent'

const DynamicAspectRatio: GameComponent = forwardRef((_props, ref) => {
  const { width, height } = useComponentSize(ref as any)

  return (
    <div ref={ref} className={game}>
      <span>{width}x{height}</span>
    </div>
  )
})

export default DynamicAspectRatio
