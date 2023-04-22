import { FC } from 'react'
import PageHeaderProps from './PageHeaderProps'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { css } from '@emotion/css'
import { Button } from 'antd'

const PageHeader: FC<PageHeaderProps> = ({
  title,
  extra,
  onBack,
  tags
}) => {
  return (
    <div
      className={css({
        display: 'flex',
        alignItems: 'center'
      })}
    >
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={onBack}
        type='ghost'
        shape='circle'
      />
      <h2>{title}</h2>
      {tags}
      <div className={css({ flexGrow: 1, flexShrink: 1, flexBasis: 0 })} />
      {extra}
    </div>
  )
}

export default PageHeader
