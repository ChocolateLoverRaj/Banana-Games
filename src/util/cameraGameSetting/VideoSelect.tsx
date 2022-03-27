import { observer } from 'mobx-react-lite'
import { Select } from 'antd'
import VideoSelectProps from './VideoSelectProps'
import { action } from 'mobx'

const VideoSelect = observer<VideoSelectProps>(({ data, videoInputs }) => {
  return (
    <Select
      value={data.cameraId.get()}
      onChange={action(id => {
        data.cameraId.set(id)
      })}
    >
      {videoInputs
        .filter(device => device.kind === 'videoinput')
        .map(({ deviceId, label }) => (
          <Select.Option key={deviceId} value={deviceId}>{label}</Select.Option>
        ))}
    </Select>
  )
})

export default VideoSelect
