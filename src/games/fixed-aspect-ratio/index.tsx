import * as React from 'react'
import { FC, useRef } from 'react'
import useComponentSize from '@rehooks/component-size'
import { gameDiv, maxSize } from './index.module.scss'

const ratio = {
  width: 16,
  height: 9
}

const FixedAspectRatio: FC = () => {
  const ref = useRef(null)
  const { width, height } = useComponentSize(ref)

  const maxScaleWidth = width / ratio.width
  const maxScaleHeight = height / ratio.height
  const scale = Math.min(maxScaleWidth, maxScaleHeight)
  const scaledWidth = ratio.width * scale
  const scaledHeight = ratio.height * scale

  return (
    <div ref={ref} className={maxSize}>
      <div className={gameDiv} style={{ width: scaledWidth, height: scaledHeight }}>
        <span>
          Available Size - {width}x{height} <br /><br />
          Aspect Ratio - {' '}
          <a href='https://en.wikipedia.org/wiki/16:9_aspect_ratio'>
            {ratio.width}:{ratio.height}
          </a> <br /><br />
          Game Size - {scaledWidth}x{scaledHeight}
        </span>
      </div>
    </div>
  )
}

export default FixedAspectRatio
