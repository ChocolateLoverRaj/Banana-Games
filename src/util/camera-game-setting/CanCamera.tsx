import { observer } from 'mobx-react-lite'
import { initialize, switchCase } from '../mobx-observable-promise'
import { useState, ReactNode } from 'react'
import VideoSelect from './VideoSelect'
import EditProps from './EditProps'

const CanCamera = observer<EditProps>(props => {
  const [devicesPromise] = useState(() => initialize(navigator.mediaDevices.enumerateDevices()))

  return (
    <>
      {switchCase<MediaDeviceInfo[], ReactNode>(
        devicesPromise,
        devices => <VideoSelect {...props} videoInputs={devices} />,
        () => 'Getting video inputs',
        () => 'Error getting video inputs')}
    </>
  )
})

export default CanCamera
