import { Tag } from 'antd'
import { FC } from 'react'
import GameMeta from './types/GameMeta'

export interface GameTagsProps {
  tags: GameMeta['tags']
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
