import { ReactNode, FC, useState, useEffect } from 'react'
import { Button, Space } from 'antd'

export type OnClose = () => void
export interface SubMenu {
  title: string
  icon?: ReactNode
  content: ReactNode
}
export interface PausedMenuProps {
  onClose: OnClose
  backKeys: Set<string>
  children: SubMenu[]
}

const PausedMenu = (props: PausedMenuProps): ReturnType<FC> => {
  const {
    onClose,
    backKeys,
    children
  } = props

  const [currentSubMenu, setCurrentSubMenu] = useState<string>()

  useEffect(() => {
    const handler = (e: KeyboardEvent): void => {
      if (backKeys.has(e.code)) {
        if (currentSubMenu !== undefined) setCurrentSubMenu(undefined)
        else onClose()
      }
    }
    addEventListener('keydown', handler)
    return () => removeEventListener('keydown', handler)
  }, [currentSubMenu, backKeys, onClose])

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
