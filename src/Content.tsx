import { FC } from 'react'
import * as React from 'react'
import { Switch, Route } from 'react-router-dom'
import GameRoute from './GameRoute'
import serviceWorkerRoute from './ServiceWorkerRoute'
import AllGames from './AllGames'

const Content: FC = () => {
  return (
    <Switch>
      <Route path='/' exact component={AllGames} />
      <Route path='/service-worker' exact component={serviceWorkerRoute} />
      <Route component={GameRoute} />
    </Switch>
  )
}

export default Content
