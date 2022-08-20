import { FC } from 'react'
import * as React from 'react'
import { Routes, Route } from 'react-router-dom'
import GameRoute from './GameRoute'
import ServiceWorkerRoute from './ServiceWorkerRoute'
import AllGames from './AllGames'
import SettingsRoute from './SettingsRoute'

const Content: FC = () => {
  return (
    <Routes>
      <Route index element={<AllGames />} />
      <Route path='service-worker' element={<ServiceWorkerRoute />} />
      <Route path='settings' element={<SettingsRoute />} />
      <Route path=':gameId' element={<GameRoute />} />
    </Routes>
  )
}

export default Content
