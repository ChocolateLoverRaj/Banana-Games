import { ReactNode, FC, useState } from 'react'
import { Button, Space } from 'antd'
import ScreenEmitter from './util/gameWithSettings/ScreenEmitter'
import { useEmitHandler } from 'emitter2'

export type OnClose = () => void
export interface SubMenu {
  title: string
  icon?: ReactNode
  content: ReactNode
}
export interface PausedMenuProps {
  onClose: OnClose
  children: SubMenu[]
  screenEmitter: ScreenEmitter
}

const PausedMenu: FC<PausedMenuProps> = ({ onClose, children, screenEmitter }) => {
  const [currentSubMenu, setCurrentSubMenu] = useState<string>()

  useEmitHandler(screenEmitter, () => {
    if (currentSubMenu !== undefined) setCurrentSubMenu(undefined)
    else setTimeout(onClose, 4)
  })

  const subMenu = currentSubMenu !== undefined
    ? children.find(({ title }) => title === currentSubMenu)
    : undefined

  return (
    <>
      <h1>{subMenu !== undefined ? subMenu.title : 'Paused Menu'}</h1>
      {subMenu !== undefined
        ? (
          <Space direction='vertical'>
            {subMenu.content}
            <Button onClick={setCurrentSubMenu.bind(undefined, undefined)}>Back</Button>
          </Space>)
        : (
          <Space direction='vertical'>
            {children.map(({ title, icon }) =>
              <Button
                key={title}
                {... { icon }}
                onClick={setCurrentSubMenu.bind(undefined, title)}
              >
                {title}
              </Button>)}
            <Button onClick={onClose}>Resume</Button>
          </Space>)}
    </>
  )
}

export default PausedMenu
