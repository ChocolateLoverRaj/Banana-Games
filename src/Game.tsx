import * as React from 'react'
import { FC } from 'react'
import { useHistory } from 'react-router-dom'
import usePromise from 'react-use-promise'
import { Spin, PageHeader, PageHeaderProps } from 'antd'
import { content, loading } from './Game.module.scss'
import useUnique from './util/useUnique'
import GameType from './types/Game'
import Helmet from 'react-helmet'
import config from './config.json'
import Error from './Error'

export interface GameProps {
  id: string
  game: GameType
}

const Game: FC<GameProps> = props => {
  const { id, game } = props

  const history = useHistory()
  const [retryAttempt, retry] = useUnique()
  const [Game, error, state] = usePromise(
    async () => (await import(`./games/${id}`)).default,
    [id, retryAttempt]
  )

  const handleBack: PageHeaderProps['onBack'] = () => history.push('')

  return (
    <>
      <Helmet>
        <title>{game.name} {'\u2022'} {config.appName}</title>
      </Helmet>
      {state === 'resolved'
        ? (
          <div className={content}>
            <PageHeader title={game.name} onBack={handleBack} />
            <Game />
          </div>
          )
        : state === 'pending'
          ? (
            <div className={loading}>
              <Spin size='large' tip='Downloading Game' />
            </div>
            )
          : (
            <Error error={error as Error} title='Error Downloading Game' retry={retry} />
            )}
    </>
  )
}

export default Game
