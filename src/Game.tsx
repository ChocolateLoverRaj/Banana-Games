import * as React from 'react'
import { FC, useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import usePromise from 'react-use-promise'
import { Spin, PageHeader, PageHeaderProps, Button, Skeleton, Collapse } from 'antd'
import useUnique from './util/useUnique'
import GameType from './types/GameJson'
import Helmet from 'react-helmet'
import config from './config.json'
import ErrorResult from './ErrorResult'
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons'
import useFullScreen from './util/useFullScreen'
import GameComponent from './types/GameComponent'
import GameTags from './GameTags'
import WarnLeaveGame from './WarnLeaveGame'
import { css } from '@emotion/css'

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

  const noDescription = Game !== undefined && Game.description === undefined

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
                : Game?.description}
            </Collapse.Panel>
          </Collapse>
        </PageHeader>
        {Game !== undefined
          ? (
            <>
              <WarnLeaveGame />
              <Game ref={ref} />
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
