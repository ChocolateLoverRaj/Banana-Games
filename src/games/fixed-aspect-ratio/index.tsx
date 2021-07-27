import * as React from 'react'
import { forwardRef } from 'react'
import useComponentSize from '@rehooks/component-size'
import GameComponent from '../../types/GameComponent'
import getScaledSize from '../../util/getScaledSize'
import Size from '../../util/types/Size'
import sizeToString from '../../util/sizeToString'
import { Typography } from 'antd'
import { GameWithActions, useScreen } from '../../util/game-with-actions'
import { game } from './index.module.scss'

const ratio: Size = {
  width: 16,
  height: 9
}

const FixedAspectRatio: GameComponent = forwardRef((_props, ref) => {
  const componentSize = useComponentSize(ref as any)
  const useScreenResult = useScreen()

  const scaledSize = getScaledSize(componentSize, ratio)

  return (
    <GameWithActions
      loadedGameConfig={{ useScreenResult }}
      aspectRatio={ratio}
      ref={ref}
      className={game}
    >
      <span>
        Available Size - {sizeToString(componentSize)} <br /><br />
        Aspect Ratio - {' '}
        <a href='https://en.wikipedia.org/wiki/16:9_aspect_ratio'>
          {ratio.width}:{ratio.height}
        </a> <br /><br />
        Game Size - {sizeToString(scaledSize)}
      </span>
    </GameWithActions>
  )
})

FixedAspectRatio.description = (
  <>
    Many games require a specific aspect ratio to play. In this website, games which use fixed
    aspect ratios will grow as big as possible while maintaining the same aspect ratio.
    <br /><br />
    The aspect ratio <a href='https://en.wikipedia.org/wiki/16:9_aspect_ratio'>16:9</a> is used in
    this game because it is commonly used.
    <Typography.Paragraph>
      <blockquote>
        Once seen as exotic, since 2009, it has become the most common aspect ratio for televisions
        and computer monitors and is also the international standard format of digital television
        HDTV Full HD and SD TV. It has replaced the fullscreen 4:3 aspect ratio.
      </blockquote>
    </Typography.Paragraph>
    On many screens this game will take up the entire
    screen in full screen mode.
  </>
)

export default FixedAspectRatio
