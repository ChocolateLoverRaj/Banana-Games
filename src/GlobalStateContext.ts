import { createContext } from 'react'
import { UseServiceWorkerResult } from './util/useServiceWorker'

export interface GlobalState {
  serviceWorker: UseServiceWorkerResult
}

const GlobalStateContext = createContext<GlobalState>(undefined as any)

export default GlobalStateContext
