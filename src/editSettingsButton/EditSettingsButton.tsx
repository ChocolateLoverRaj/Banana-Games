import { SettingOutlined } from '@ant-design/icons'
import { Button, Modal } from 'antd'
import { FC, useState } from 'react'
import GameSettings from '../games/game-settings/gameWithSettings/GameSettings'
import Props from './Props'

const EditSettingsButton: FC<Props> = ({ settings }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        icon={<SettingOutlined />}
        type='text'
        onClick={() => setOpen(true)}
      />
      <Modal
        open={open}
        title='Edit Settings'
        style={{
          top: 0
        }}
        width='100%'
        footer={null}
        onCancel={() => setOpen(false)}
      >
        <GameSettings input={settings} />
      </Modal>
    </>
  )
}

export default EditSettingsButton
