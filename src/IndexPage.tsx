import { HashRouter } from 'react-router-dom'
import Content from './Content'
import Menu from './Menu'
import GlobalStateContext from './GlobalStateContext'
import useServiceWorker from './util/useServiceWorker'
import { message, ConfigProvider, theme } from 'antd'
import useDownloadedGames from './useDownloadedGames'
import { css, cx } from '@emotion/css'
import mobxTheme from './theme'
import { observer } from 'mobx-react-lite'
import './IndexPage.css'
import getColorPrimary from './getColorPrimary'

const IndexPage = observer(() => {
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
            : theme.defaultAlgorithm,
          token: {
            colorPrimary: getColorPrimary()
          }
        }}
      >
        <GlobalStateContext.Provider value={{ serviceWorker, downloadedGames }}>
          <div className={cx(
            css`
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
              }`,
            mobxTheme.theme === 'dark'
              ? css({
                backgroundColor: 'black',
                color: 'white'
              })
              : css({
                backgroundColor: 'white',
                color: 'black'
              }))}
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
})

export default IndexPage
