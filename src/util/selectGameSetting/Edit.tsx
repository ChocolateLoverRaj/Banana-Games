import { observer } from 'mobx-react-lite'
import EditProps from './EditProps'
import { Select } from 'antd'
import { action } from 'mobx'

const Edit = observer<EditProps>(({ data }) => {
  return (
    <Select
      value={data.selectedOption}
      onChange={action((value) => {
        data.selectedOption = value
      })}
    >
      {data.options.map(({ key, value, reactNode }) =>
        <Select.Option key={key} value={value ?? key}>{reactNode ?? key}</Select.Option>)}
    </Select>
  )
})

export default Edit
