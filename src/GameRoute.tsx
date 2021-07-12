import * as React from 'react'
import { FC } from 'react'
import { RouteComponentProps, Link } from 'react-router-dom'
import { Result, Button } from 'antd'
import games from './games'
import Game from './Game'
import Helmet from 'react-helmet'
import { appName } from './config'

const GameRoute: FC<RouteComponentProps> = props => {
  const { location: { pathname } } = props
  const gameId = pathname.slice(1)
  const game = games.get(gameId)

  return (
    <>
      {game !== undefined
        ? <Game id={gameId} game={game} />
        : (
          <>
            <Helmet>
              <title>{'<404>'} {'\u2022'} {appName}</title>
            </Helmet>
            <Result
              status='404'
              title='Game Not Found'
              subTitle={<>No game exists with the id: <pre>{gameId}</pre></>}
              extra={<Button type='primary'><Link to=''>Go to all games</Link></Button>}
            />
          </>
          )}
    </>
  )
}

export default GameRoute
