import { Table } from 'antd'
import { observer } from 'mobx-react-lite'
import ResetButton from './ResetButton'
import { GameSetting } from '../game-setting'

export interface EditGameSettingsProps {
  settings: GameSetting[]
}

const EditGameSettings = observer<EditGameSettingsProps>(({ settings }) => {
  return (
    <Table
      title={() => 'Game Settings'}
      dataSource={[...settings]}
      columns={[{
        title: 'Name',
        render: (setting: GameSetting) => setting.displayName
      }, {
        title: 'Edit',
        render: (setting: GameSetting) => setting.renderEdit()
      }, {
        title: 'Reset',
        render: (setting: GameSetting) => <ResetButton {...{ setting }} />
      }]}
      pagination={{ hideOnSinglePage: true }}
      rowKey={setting => setting.displayName}
    />
  )
})

export default EditGameSettings
