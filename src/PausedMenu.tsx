import { ReactNode, FC, useState } from 'react'
import { Button, Space } from 'antd'
import { ActionInputs, useOnAction } from './util/action-inputs'

export type OnClose = () => void
export interface SubMenu {
  title: string
  icon?: ReactNode
  content: ReactNode
}
export interface PausedMenuProps {
  onClose: OnClose
  actionInputs: ActionInputs
  action: string
  children: SubMenu[]
}

const PausedMenu = (props: PausedMenuProps): ReturnType<FC> => {
  const { onClose, actionInputs, children, action } = props

  const [currentSubMenu, setCurrentSubMenu] = useState<string>()

  useOnAction(actionInputs, undefined, action, () => {
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
