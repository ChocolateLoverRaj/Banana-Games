import * as React from 'react'
import { forwardRef } from 'react'
import useComponentSize from '@rehooks/component-size'
import { gameDiv, maxSize } from './index.module.scss'
import GameComponent from '../../types/GameComponent'
import getScaledSize from '../../util/getScaledSize'
import Size from '../../util/types/Size'
import sizeToString from '../../util/sizeToString'

const ratio: Size = {
  width: 16,
  height: 9
}

const FixedAspectRatio: GameComponent = forwardRef((_props, ref) => {
  const componentSize = useComponentSize(ref as any)

  const scaledSize = getScaledSize(componentSize, ratio)

  return (
    <div ref={ref} className={maxSize}>
      <div className={gameDiv} style={scaledSize}>
        <span>
          Available Size - {sizeToString(componentSize)} <br /><br />
          Aspect Ratio - {' '}
          <a href='https://en.wikipedia.org/wiki/16:9_aspect_ratio'>
            {ratio.width}:{ratio.height}
          </a> <br /><br />
          Game Size - {sizeToString(scaledSize)}
        </span>
      </div>
    </div>
  )
})

export default FixedAspectRatio
