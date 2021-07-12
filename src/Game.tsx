import * as React from 'react'
import { FC, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import usePromise from 'react-use-promise'
import { Spin, Result, Button, PageHeader, PageHeaderProps } from 'antd'
import { loading } from './Game.module.scss'
import useUnique from './util/useUnique'
import GameType from './types/Game'
import Helmet from 'react-helmet'
import { appName } from './config'

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
  useEffect(() => {
    if (error !== undefined) console.error(error)
  }, [error])

  const handleBack: PageHeaderProps['onBack'] = () => history.push('')

  return (
    <>
      <Helmet>
        <title>{game.name} {'\u2022'} {appName}</title>
      </Helmet>
      {state === 'resolved'
        ? (
          <div>
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
            <Result
              status='error'
              title='Error Downloading Game'
              subTitle='Open console to view error'
              extra={<Button type='primary' onClick={retry}>Retry</Button>}
            />
            )}
    </>
  )
}

export default Game
