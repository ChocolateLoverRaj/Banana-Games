import { CSSObject } from '@emotion/css'

const dynamicAspectRatioStyles: CSSObject = {
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  ':first-child': {
    flex: '0 0 auto'
  },
  ':nth-child(2)': {
    flex: '1 1 auto'
  }
}

export default dynamicAspectRatioStyles
