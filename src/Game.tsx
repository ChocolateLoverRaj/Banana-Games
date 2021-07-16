import * as React from 'react'
import { FC, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import usePromise from 'react-use-promise'
import { Spin, PageHeader, PageHeaderProps, Button } from 'antd'
import { content, loading } from './Game.module.scss'
import useUnique from './util/useUnique'
import GameType from './types/GameJson'
import Helmet from 'react-helmet'
import config from './config.json'
import ErrorResult from './ErrorResult'
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons'
import useFullScreen from './util/useFullScreen'
import GameComponent from './types/GameComponent'

export interface GameProps {
  id: string
  game: GameType
}

const Game: FC<GameProps> = props => {
  const { id, game } = props

  const history = useHistory()
  const [retryAttempt, retry] = useUnique()
  const [Game, error, state] = usePromise<GameComponent>(
    async () => (await import(
      /* webpackInclude: /index.tsx/ */
      /* webpackChunkName: "games/[request]" */
      `./games/${id}`
    )).default,
    [id, retryAttempt]
  )
  const ref = useRef(null)
  const [fullScreen, setFullScreen] = useFullScreen(ref)

  const handleBack: PageHeaderProps['onBack'] = () => history.push('')

  return (
    <>
      <Helmet>
        <title>{game.name} {'\u2022'} {config.appName}</title>
      </Helmet>
      {Game !== undefined
        ? (
          <div className={content}>
            <PageHeader
              title={game.name}
              onBack={handleBack}
              extra={
                <Button type='text' onClick={setFullScreen.bind(undefined, !fullScreen)}>
                  {fullScreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
                </Button>
              }
            />
            <Game ref={ref} />
          </div>
          )
        : state === 'pending'
          ? (
            <div className={loading}>
              <Spin size='large' tip='Downloading Game' />
            </div>
            )
          : (
            <ErrorResult error={error as Error} title='Error Downloading Game' retry={retry} />
            )}
    </>
  )
}

export default Game
