import { Tag } from 'antd'
import { FC } from 'react'
import GameJson from './types/GameJson'

export interface GameTagsProps {
  tags: GameJson['tags']
}

const GameTags: FC<GameTagsProps> = props => {
  const { tags } = props

  return (
    <>
      {tags?.map(tag => <Tag key={tag}>{tag}</Tag>)}
    </>
  )
}

export default GameTags
