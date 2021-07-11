import { FC } from 'react'
import * as React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { Table } from 'antd'
import games from './games'
import Game from './types/Game'
import { header } from './Content.module.scss'

const Content: FC = () => {
  return (
    <Switch>
      <Route path='/' exact>
        <h1 className={header}>All Games</h1>
        <Table
          dataSource={games} columns={[{
            title: 'Name',
            render: ({ url, name }: Game) => <Link to={`./${url}`}>{name}</Link>
          }]}
          rowKey='name'
          pagination={{ hideOnSinglePage: true }}
        />
      </Route>
      <Route>
        Game Specific Page
      </Route>
    </Switch>
  )
}

export default Content
