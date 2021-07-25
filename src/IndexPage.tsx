import * as React from 'react'
import { FC } from 'react'
import { page } from './IndexPage.module.scss'
import { HashRouter } from 'react-router-dom'
import Content from './Content'
import Menu from './Menu'
import GlobalStateContext from './GlobalStateContext'
import useServiceWorker from './util/useServiceWorker'
import { message } from 'antd'
import useDownloadedGames from './useDownloadedGames'
import { IndexedDbProvider } from './util/use-indexed-db'
import settingsDb from './settingsDb'

const IndexPage: FC = () => {
  const serviceWorker = useServiceWorker('./serviceWorker.js', () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    message.info('No updates found')
  })
  const downloadedGames = useDownloadedGames(serviceWorker[10])

  return (
    <IndexedDbProvider
      dbs={new Map([[settingsDb, {
        version: 2,
        upgrade: async (db, previousVersion) => {
          console.log(previousVersion)
          if (previousVersion === 1) {
            // TODO: Smoother upgrades: https://github.com/jakearchibald/idb/issues/231
            db.deleteObjectStore('settings')
          }
          const store = db.createObjectStore('settings')
          await Promise.all([
            store.add(true, 'pausedWhenNotVisible'),
            store.add(true, 'warnBeforeLeavingGame')
          ])
        }
      }]])}
    >
      <HashRouter hashType='noslash'>
        <GlobalStateContext.Provider value={{ serviceWorker, downloadedGames }}>
          <div className={page}>
            <div>
              <Menu />
            </div>
            <Content />
          </div>
        </GlobalStateContext.Provider>
      </HashRouter>
    </IndexedDbProvider>
  )
}

export default IndexPage
