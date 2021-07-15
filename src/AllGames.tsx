import * as React from 'react'
import { FC, useContext } from 'react'
import config from './config.json'
import Helmet from 'react-helmet'
import { Table } from 'antd'
import games from './games'
import Game from './types/Game'
import { header } from './AllGames.module.scss'
import { Link } from 'react-router-dom'
import GlobalStateContext from './GlobalStateContext'
import Error from './Error'

const AllGames: FC = () => {
  const [downloadedGames, downloadedGamesError, downloadedGamesState, retry] = useContext(GlobalStateContext).downloadedGames

  return (
    <>
      <Helmet>
        <title>{config.appName}</title>
      </Helmet>
      <div>
        <h1 className={header}>All Games</h1>
        {downloadedGamesError === undefined
          ? <Table
              dataSource={[...games]} columns={[{
                title: 'Name',
                render: ([url, { name }]: [string, Game]) => <Link to={`./${url}`}>{name}</Link>
              }, {
                title: 'Downloaded',
                render: ([url, { name }]: [string, Game]) => null
              }]}
              rowKey='0'
              pagination={{ hideOnSinglePage: true }}
            />
          : <Error
              error={downloadedGamesError}
              title='Error Getting Downloaded Games'
              retry={retry}
            />}
      </div>
    </>
  )
}

export default AllGames
