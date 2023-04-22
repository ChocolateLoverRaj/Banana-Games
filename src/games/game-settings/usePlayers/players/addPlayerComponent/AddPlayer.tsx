import { UserAddOutlined } from '@ant-design/icons'
import { Button, Result, Spin, Typography } from 'antd'
import { FC } from 'react'
import Props from './Props'

const AddPlayer: FC<Props> = ({ ioName, id, presets, onAdd }) => {
  return (
    <Result
      icon={<UserAddOutlined />}
      title={`New ${ioName} detected`}
      subTitle={
        <>
          ID: <Typography.Text code>{id}</Typography.Text><br />
          Choose a preset
        </>
    }
      extra={
        <>
          {presets !== undefined
            ? presets.map(({ name, id }) => (
              <Button
                key={id}
                size='large'
                onClick={() => onAdd(id)}
              >
                {name}
              </Button>
            ))
            : <Spin />}
        </>
}
    />
  )
}

export default AddPlayer
