import * as React from 'react'
import { forwardRef } from 'react'
import useComponentSize from '@rehooks/component-size'
import { gameDiv, maxSize } from './index.module.scss'
import GameComponent from '../../types/GameComponent'
import getScaledSize from '../../util/getScaledSize'
import Size from '../../util/Size'
import assignSame from '../../util/assignSame'

const ratio = assignSame(new Size(), {
  width: 16,
  height: 9
})

const FixedAspectRatio: GameComponent = forwardRef((_props, ref) => {
  const componentSize = assignSame(new Size(), useComponentSize(ref as any))

  const scaledSize = getScaledSize(componentSize, ratio)

  return (
    <div ref={ref} className={maxSize}>
      <div className={gameDiv} style={scaledSize}>
        <span>
          Available Size - {componentSize.toString()} <br /><br />
          Aspect Ratio - {' '}
          <a href='https://en.wikipedia.org/wiki/16:9_aspect_ratio'>
            {ratio.width}:{ratio.height}
          </a> <br /><br />
          Game Size - {scaledSize.toString()}
        </span>
      </div>
    </div>
  )
})

export default FixedAspectRatio
