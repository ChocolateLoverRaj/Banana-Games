import * as React from 'react'
import { createRoot } from 'react-dom/client'
import IndexPage from './IndexPage'
import light from './light.lazy.css'
import dark from './dark.lazy.css'
import { DefaultThemes } from 'mobx-theme'
import LazyCss from './LazyCss'
import { autorunCleanup } from 'mobx-autorun-cleanup'
import theme from './theme'
import never from 'never'

const themes: Record<DefaultThemes, LazyCss> = { light, dark }

createRoot(document.getElementById('app') ?? never()).render(<IndexPage />)

autorunCleanup(() => {
  const currentTheme = theme.theme
  themes[currentTheme].use()
  return () => themes[currentTheme].unuse()
})
