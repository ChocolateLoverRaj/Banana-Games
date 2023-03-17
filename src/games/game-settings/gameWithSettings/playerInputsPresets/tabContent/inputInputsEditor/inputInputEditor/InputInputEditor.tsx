import { FC } from 'react'
import Props from './Props'
import { Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

const InputInputEditor: FC<Props> = ({ value, onChange, onDelete }) => {
  return (
    <div>
      <Button
        icon={<DeleteOutlined />}
        onClick={onDelete}
        danger
      />
    </div>
  )
}

export default InputInputEditor
