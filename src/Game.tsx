import * as React from 'react'
import { FC, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import usePromise from 'react-use-promise'
import { Spin, Result, Button } from 'antd'
import { loading } from './Game.module.scss'
import useUnique from './util/useUnique'

const Game: FC<RouteComponentProps> = props => {
  const { location: { pathname } } = props

  const [retryAttempt, retry] = useUnique()
  const [Game, error, state] = usePromise(
    async () => (await import(`./games${pathname}`)).default,
    [pathname, retryAttempt]
  )
  useEffect(() => {
    if (error !== undefined) console.error(error)
  }, [error])

  return (
    <>
      {state === 'resolved'
        ? <Game />
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
