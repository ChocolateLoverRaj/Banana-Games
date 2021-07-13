import * as React from 'react'
import { FC, useRef } from 'react'
import useComponentSize from '@rehooks/component-size'
import { game } from './index.module.scss'

const DynamicAspectRatio: FC = () => {
  const ref = useRef(null)
  const { width, height } = useComponentSize(ref)

  return (
    <div ref={ref} className={game}>
      <span>{width}x{height}</span>
    </div>
  )
}

export default DynamicAspectRatio
