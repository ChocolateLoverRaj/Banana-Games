import { observer } from 'mobx-react-lite'
import VideoStarterProps from './VideoStarterProps'
import { useRef, useState, useEffect } from 'react'
import { Data, initialize, switchCase } from '../../util/mobx-observable-promise'
import never from 'never'
import { Typography } from 'antd'
import DetectorStarter from './DetectorStarter'

const VideoStarter = observer<VideoStarterProps>(props => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playPromise, setPlayPromise] = useState<Data<void>>()

  useEffect(() => setPlayPromise(initialize((async () => {
    const video = videoRef.current ?? never()
    video.srcObject = props.mediaStream
    await video.play()
  })())), [props.mediaStream])

  return (
    <>
      <video ref={videoRef} hidden />
      {playPromise !== undefined
        ? switchCase(
          playPromise,
          () => <DetectorStarter {...props} {...{ videoRef }} />,
          () => (
            <a href='https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play'>
              Playing Video
            </a>),
          () => (
            <>
              Error
              {' '}
              <a href='https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play'>
                playing
              </a>
              {' '}
              video
            </>)
        )
        : (
          <>
            Rendering
            {' '}
            <a href='https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement'>
              <Typography.Text code>video</Typography.Text>
              {' '}
              element
            </a>
          </>)}
    </>
  )
})

export default VideoStarter
