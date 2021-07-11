import * as React from 'react'
import { FC } from 'react'
import Helmet from 'react-helmet'
import { Menu } from 'antd'
import { GithubOutlined } from '@ant-design/icons'
import { ghUrl } from './config'
import { menu } from './main.module.scss'

const IndexPage: FC = () => (
  <>
    <Helmet>
      <title>Games</title>
    </Helmet>
    <Menu className={menu}>
      <Menu.Item key='gh' icon={<GithubOutlined />}>
        <a href={ghUrl}>GitHub</a>
      </Menu.Item>
      <Menu.SubMenu key='games' title='Games' />
    </Menu>
  </>
)

export default IndexPage
