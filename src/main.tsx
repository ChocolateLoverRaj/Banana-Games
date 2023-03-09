import * as React from 'react'
import { createRoot } from 'react-dom/client'
import IndexPage from './IndexPage'
import { DefaultThemes } from 'mobx-theme'
import theme from './theme'
import never from 'never'

createRoot(document.getElementById('app') ?? never()).render(<IndexPage />)
