import * as React from 'react'
import { createRoot } from 'react-dom/client'
import IndexPage from './IndexPage'
import light from 'antd/dist/antd.css?raw'
import dark from 'antd/dist/antd.dark.css?raw'
import { DefaultThemes } from 'mobx-theme'
import theme from './theme'
import never from 'never'
import { autorun } from 'mobx'

const themes: Record<DefaultThemes, string> = { light, dark }

createRoot(document.getElementById('app') ?? never()).render(<IndexPage />)

const themeStyleElement = document.createElement('style')
document.head.appendChild(themeStyleElement)
autorun(() => {
  const currentTheme = theme.theme
  themeStyleElement.innerText = themes[currentTheme]
})
