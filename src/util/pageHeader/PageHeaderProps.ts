import { MouseEventHandler, ReactNode } from 'react'

interface PageHeaderProps {
  title: ReactNode
  onBack?: MouseEventHandler
  extra?: ReactNode
  tags?: ReactNode
}

export default PageHeaderProps
