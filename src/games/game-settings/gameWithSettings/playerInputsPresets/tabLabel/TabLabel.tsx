import { Input } from 'antd'
import { FC } from 'react'
import Props from './Props'

const TabLabel: FC<Props> = ({ name, onChange }) => {
  return (
    <Input
      value={name}
      bordered={false}
      onChange={({ target: { value } }) => {
        onChange(value)
      }}
    />
  )
}

export default TabLabel
