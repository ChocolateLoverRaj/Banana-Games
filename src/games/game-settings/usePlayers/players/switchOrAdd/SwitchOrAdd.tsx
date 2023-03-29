import { UserAddOutlined, UserSwitchOutlined } from '@ant-design/icons'
import { Button, Result, Typography } from 'antd'
import { FC } from 'react'
import Props from './Props'

const SwitchOrAdd: FC<Props> = ({ id, name }) => {
  return (
    <Result
      icon={null}
      title={`New ${name} detected`}
      subTitle={
        <>
          ID: <Typography.Text code>{id}</Typography.Text><br />
        </>
          }
      extra={
        <>
          <Button
            icon={<UserAddOutlined />}
            type='primary'
            size='large'
          >
            Add Player
          </Button>
          <Button
            icon={<UserSwitchOutlined />}
            size='large'
          >
            Change IO
          </Button>
        </>
      }
    />
  )
}

export default SwitchOrAdd
