import { PropsWithChildren } from 'react'
import { observer } from 'mobx-react-lite'
import pausedStyles from '../../pausedStyles'
import TinyColor from 'tinycolor2'
import { css } from '@emotion/css'
import getBackgroundColor from '../../getBackgroundColor'

const PausedContainer = observer<PropsWithChildren<{}>>(({ children }) => (
  <div
    className={css({
      ...pausedStyles,
      backgroundColor: new TinyColor(getBackgroundColor()).lighten(50).setAlpha(0.75).toRgbString()
    })}
  >
    {children}
  </div>))

export default PausedContainer
