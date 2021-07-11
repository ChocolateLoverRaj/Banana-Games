import { FC } from 'react'
import { Menu as AntdMenu } from 'antd'
import { GithubOutlined } from '@ant-design/icons'
import { ghUrl } from './config'
import * as React from 'react'
import { menu } from './Menu.module.scss'
import { useLocation, Link } from 'react-router-dom'
import games from './games'

const Menu: FC = () => {
  const { pathname } = useLocation()

  const handleClick = ({ key }: { key: string }): void => {
    console.log(key)
  }

  return (
    <AntdMenu
      className={menu}
      mode='inline'
      selectedKeys={[pathname]}
      defaultOpenKeys={['games']}
      onClick={handleClick}
    >
      <AntdMenu.Item key='/'><Link to='/'>All Games</Link></AntdMenu.Item>
      <AntdMenu.SubMenu key='games' title='Games'>
        {games.map(({ name, url }) =>
          <AntdMenu.Item key={`/${url}`}><Link to={`/${url}`}>{name}</Link></AntdMenu.Item>)}
      </AntdMenu.SubMenu>
      <AntdMenu.Item key='gh' icon={<GithubOutlined />}>
        <a href={ghUrl}>GitHub</a>
      </AntdMenu.Item>
    </AntdMenu>
  )
}

export default Menu
