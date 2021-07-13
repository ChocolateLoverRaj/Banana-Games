import * as React from 'react'
import { render } from 'react-dom'
import IndexPage from './IndexPage'
import registerServiceWorker from './registerServiceWorker'

render(<IndexPage />, document.getElementById('app'))
registerServiceWorker()
