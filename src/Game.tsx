import * as React from 'react'
import { FC, useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import usePromise from 'react-use-promise'
import { Spin, PageHeader, PageHeaderProps, Button, Skeleton, Collapse } from 'antd'
import useUnique from './util/useUnique'
import GameType from './types/GameMeta'
import Helmet from 'react-helmet'
import config from './config.json'
import ErrorResult from './ErrorResult'
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons'
import useFullScreen from './util/useFullScreen'
import GameTags from './GameTags'
import WarnLeaveGame from './WarnLeaveGame'
import { css } from '@emotion/css'
import GameExports from './types/GameExports'

export interface GameProps {
  id: string
  game: GameType
}

const Game: FC<GameProps> = props => {
  const { id, game } = props

  const history = useHistory()
  const [retryAttempt, retry] = useUnique()
  const [gameExports, error, state] = usePromise<GameExports>(
    async () => await import(
      /* webpackInclude: /index.tsx/ */
      /* webpackChunkName: "games/[request]" */
      `./games/${id}`
    ),
    [id, retryAttempt]
  )
  const ref = useRef(null)
  const [fullScreen, setFullScreen] = useFullScreen(ref)

  useEffect(() => {
    const handler = (e: KeyboardEvent): void => {
      if (e.code === 'F11') {
        // Don't let browser make entire page fullscreen
        e.preventDefault()
        setFullScreen(true)
      }
    }
    addEventListener('keydown', handler)
    return () => removeEventListener('keydown', handler)
  }, [setFullScreen])

  const handleBack: PageHeaderProps['onBack'] = () => history.push('')

  const noDescription = gameExports !== undefined && gameExports.description === undefined

  return (
    <>
      <Helmet>
        <title>{game.name} {'\u2022'} {config.appName}</title>
      </Helmet>
      <div
        className={css`
        display: flex;
        flex-direction: column;

        > :nth-child(1) {
          flex: 0 0 auto;
          max-height: 50%;
          overflow: auto;
        }

        :nth-child(2) {
          flex: 1 1 auto;
        }`}
      >
        <PageHeader
          title={game.name}
          onBack={handleBack}
          extra={
            <Button type='text' onClick={setFullScreen.bind(undefined, !fullScreen)}>
              {fullScreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
            </Button>
              }
          tags={<GameTags tags={game.tags} />}
        >
          <Collapse defaultActiveKey={noDescription ? undefined : 'description'} ghost>
            <Collapse.Panel
              header='Description'
              key='description'
              collapsible={noDescription ? 'disabled' : 'header'}
            >
              {state === 'pending'
                ? <Skeleton active title={false} />
                : gameExports?.description}
            </Collapse.Panel>
          </Collapse>
        </PageHeader>
        {gameExports !== undefined
          ? (
            <>
              <WarnLeaveGame />
              <gameExports.Game ref={ref} />
            </>
            )
          : state === 'pending'
            ? (
              <div className={css({ textAlign: 'center' })}>
                <Spin size='large' tip='Downloading Game' />
              </div>
              )
            : (
              <ErrorResult error={error as Error} title='Error Downloading Game' retry={retry} />
              )}
      </div>
    </>
  )
}

export default Game
