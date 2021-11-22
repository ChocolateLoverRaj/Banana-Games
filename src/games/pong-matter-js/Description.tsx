import { Typography } from 'antd'
import config from '../../config.json'
import { FC } from 'react'

const Description: FC = () => (
  <Typography.Paragraph>
    <a href='https://en.wikipedia.org/wiki/Pong'>Pong</a> has been a video game for a long time,
    and many people make pong as a sample game. Because it is so simple, pong is the first real
    game on {config.appName}.
  </Typography.Paragraph>
)

export default Description
