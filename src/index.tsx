import * as React from 'react'
import { render } from 'react-dom'
import IndexPage from './IndexPage'
import light from './light.lazy.css'
import dark from './dark.lazy.css'
import { DefaultThemes } from 'mobx-theme'
import LazyCss from './LazyCss'
import { autorunCleanup } from 'mobx-autorun-cleanup'
import theme from './theme'

const themes: Record<DefaultThemes, LazyCss> = { light, dark }

render(<IndexPage />, document.getElementById('app'))

autorunCleanup(() => {
  const currentTheme = theme.theme
  themes[currentTheme].use()
  return () => themes[currentTheme].unuse()
})
