import { FC } from 'react'
import { Menu as AntdMenu } from 'antd'
import { GithubOutlined } from '@ant-design/icons'
import config from './config.json'
import * as React from 'react'
import { useLocation, Link } from 'react-router-dom'
import games from './games'
import { css } from '@emotion/css'

const Menu: FC = () => {
  const { pathname } = useLocation()
  return (
    <AntdMenu
      className={css({
        width: 256,
        height: '100%'
      })}
      mode='inline'
      selectedKeys={[pathname]}
      defaultOpenKeys={['games']}
      items={[{
        key: '/',
        label: <Link to='/'>All Games</Link>
      }, {
        key: 'games',
        label: 'Games',
        children: [...games].map(([url, { name }]) => ({
          key: `/${url}`,
          label: <Link to={`/${url}`}>{name}</Link>
        }))
      }, {
        key: 'settings',
        label: <Link to='/settings'>Settings</Link>
      }, {
        key: 'serviceWorker',
        label: <Link to='/service-worker'>Service Worker</Link>
      }, {
        key: 'gh',
        icon: <GithubOutlined />,
        label: <a href={config.ghUrl}>GitHub</a>
      }]}
    />
  )
}

export default Menu
