import { FC } from 'react'
import * as React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { Table } from 'antd'
import games from './games'
import Game from './types/Game'
import { header } from './Content.module.scss'
import GameRoute from './GameRoute'

const Content: FC = () => {
  return (
    <Switch>
      <Route path='/' exact>
        <div>
          <h1 className={header}>All Games</h1>
          <Table
            dataSource={[...games]} columns={[{
              title: 'Name',
              render: ([url, { name }]: [string, Game]) => <Link to={`./${url}`}>{name}</Link>
            }]}
            rowKey='0'
            pagination={{ hideOnSinglePage: true }}
          />
        </div>
      </Route>
      <Route component={GameRoute} />
    </Switch>
  )
}

export default Content
