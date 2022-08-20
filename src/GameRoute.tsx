import * as React from 'react'
import { FC } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Result, Button } from 'antd'
import games from './games'
import Game from './Game'
import Helmet from 'react-helmet'
import config from './config.json'
import never from 'never'

const GameRoute: FC = () => {
  const gameId = useParams<{ gameId: string }>().gameId ?? never()
  const game = games.get(gameId)

  return (
    <>
      {game !== undefined
        ? <Game id={gameId} game={game} />
        : (
          <>
            <Helmet>
              <title>{'<404>'} {'\u2022'} {config.appName}</title>
            </Helmet>
            <Result
              status='404'
              title='Game Not Found'
              subTitle={<>No game exists with the id: <pre>{gameId}</pre></>}
              extra={<Button type='primary'><Link to=''>Go to all games</Link></Button>}
            />
          </>)}
    </>
  )
}

export default GameRoute
