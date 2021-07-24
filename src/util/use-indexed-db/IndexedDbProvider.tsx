import { FC, ReactNode, useState } from 'react'
import Context, { ContextData, Dbs } from './Context'

export interface IndexedDbProviderProps {
  dbs: Dbs
  children: ReactNode
}

const IndexedDbProvider: FC<IndexedDbProviderProps> = props => {
  const { dbs, children } = props

  const [dbData] = useState<ContextData>(() => ({
    dbs,
    openDbs: new Map()
  }))

  return (
    <Context.Provider value={dbData}>
      {children}
    </Context.Provider>
  )
}

export default IndexedDbProvider
