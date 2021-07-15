import { createContext } from 'react'
import { UseDownloadedGamesResult } from './useDownloadedGames'
import { UseServiceWorkerResult } from './util/useServiceWorker'

export interface GlobalState {
  serviceWorker: UseServiceWorkerResult
  downloadedGames: UseDownloadedGamesResult
}

const GlobalStateContext = createContext<GlobalState>(undefined as any)

export default GlobalStateContext
