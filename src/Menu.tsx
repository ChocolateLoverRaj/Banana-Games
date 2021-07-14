import { FC } from 'react'
import { Menu as AntdMenu } from 'antd'
import { GithubOutlined } from '@ant-design/icons'
import config from './config.json'
import * as React from 'react'
import { menu } from './Menu.module.scss'
import { useLocation, Link } from 'react-router-dom'
import games from './games'

const Menu: FC = () => {
  const { pathname } = useLocation()
  return (
    <AntdMenu
      className={menu}
      mode='inline'
      selectedKeys={[pathname]}
      defaultOpenKeys={['games']}
    >
      <AntdMenu.Item key='/'><Link to='/'>All Games</Link></AntdMenu.Item>
      <AntdMenu.SubMenu key='games' title='Games'>
        {[...games].map(([url, { name }]) =>
          <AntdMenu.Item key={`/${url}`}><Link to={`/${url}`}>{name}</Link></AntdMenu.Item>)}
      </AntdMenu.SubMenu>
      <AntdMenu.Item key='serviceWorker'>
        <Link to='/service-worker'>Service Worker</Link>
      </AntdMenu.Item>
      <AntdMenu.Item key='gh' icon={<GithubOutlined />}>
        <a href={config.ghUrl}>GitHub</a>
      </AntdMenu.Item>
    </AntdMenu>
  )
}

export default Menu
