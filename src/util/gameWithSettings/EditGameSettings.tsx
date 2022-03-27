import { Table } from 'antd'
import { observer } from 'mobx-react-lite'
import ResetButton from './ResetButton'
import { GameSetting } from '../gameSetting'

export interface EditGameSettingsProps {
  settings: ReadonlyArray<GameSetting<any, any>>
}

const EditGameSettings = observer<EditGameSettingsProps>(({ settings }) => {
  return (
    <Table
      title={() => 'Game Settings'}
      dataSource={[...settings]}
      columns={[{
        title: 'Name',
        render: ({ fns, data, context }: GameSetting<any, any>) => fns.getName({ data, context })
      }, {
        title: 'Edit',
        render: ({ fns, data, context }: GameSetting<any, any>) => fns.renderEdit({ data, context })
      }, {
        title: 'Reset',
        render: (setting: GameSetting<any, any>) => setting.fns.reset !== undefined &&
          <ResetButton {...{ setting }} />
      }]}
      pagination={{ hideOnSinglePage: true }}
      rowKey={({ fns, data, context }) => fns.getName({ data, context })}
    />
  )
})

export default EditGameSettings
