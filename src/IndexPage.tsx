import { FC } from 'react'
import { HashRouter } from 'react-router-dom'
import Content from './Content'
import Menu from './Menu'
import GlobalStateContext from './GlobalStateContext'
import useServiceWorker from './util/useServiceWorker'
import { message } from 'antd'
import useDownloadedGames from './useDownloadedGames'
import { IndexedDbProvider } from './util/use-indexed-db'
import settingsDb from './settingsDb'
import { css } from '@emotion/css'

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
        upgrade: async (db, previousVersion, _currentVersion, transaction) => {
          if (previousVersion === 0) {
            const store = db.createObjectStore('settings')
            await Promise.all([
              store.add(true, 'pausedWhenNotVisible'),
              store.add(true, 'warnBeforeLeavingGame')
            ])
          } else {
            await transaction.objectStore('settings').add(true, 'warnBeforeLeavingGame')
          }
        }
      }]])}
    >
      <HashRouter hashType='noslash'>
        <GlobalStateContext.Provider value={{ serviceWorker, downloadedGames }}>
          <div className={css`
            width: 100vw;
            height: 100vh;
            display: flex;
          
            > :nth-child(1) {
              flex: 0 0 auto;
              overflow-y: auto;
              overflow-x: clip;
            }
          
            > :nth-child(2) {
              flex: 1 1 auto;
            }`}
          >
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
