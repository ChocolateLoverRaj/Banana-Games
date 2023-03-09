import { FC } from 'react'
import { HashRouter } from 'react-router-dom'
import Content from './Content'
import Menu from './Menu'
import GlobalStateContext from './GlobalStateContext'
import useServiceWorker from './util/useServiceWorker'
import { message, ConfigProvider, theme } from 'antd'
import useDownloadedGames from './useDownloadedGames'
import { css } from '@emotion/css'
import mobxTheme from './theme'

const IndexPage: FC = () => {
  const serviceWorker = useServiceWorker('./serviceWorker.js', () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    message.info('No updates found')
  })
  const downloadedGames = useDownloadedGames(serviceWorker[10])

  return (
    <HashRouter>
    <ConfigProvider
      theme={{
        algorithm: mobxTheme.theme === 'dark'
        ? theme.darkAlgorithm 
        : theme.defaultAlgorithm
      }}
    >
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
      </ConfigProvider>
    </HashRouter>
  )
}

export default IndexPage
