import { ReactNode, FC, useState } from 'react'
import { Button, Space } from 'antd'
import PauseEmitter from './util/PauseEmitter'
import { useEmitHandler } from './util/emitter'

export type OnClose = () => void
export interface SubMenu {
  title: string
  icon?: ReactNode
  content: ReactNode
}
export interface PausedMenuProps {
  onClose: OnClose
  children: SubMenu[]
  pauseEmitter: PauseEmitter
}

const PausedMenu: FC<PausedMenuProps> = ({ onClose, children, pauseEmitter }) => {
  const [currentSubMenu, setCurrentSubMenu] = useState<string>()

  useEmitHandler(pauseEmitter, () => {
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
          </Space>
          )
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
          </Space>
          )}
    </>
  )
}

export default PausedMenu
