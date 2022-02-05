import { useEffect, useState, ReactNode } from 'react'
import { observer } from 'mobx-react-lite'
import { Data, initialize, switchCase } from '../../util/mobx-observable-promise'
import { setBackend } from '@tensorflow/tfjs-core'
import { createDetector, SupportedModels, PoseDetector, movenet } from '@tensorflow-models/pose-detection'
import '@tensorflow/tfjs-backend-webgl'
import DetectorStarterProps from './DetectorStarterProps'
import DetectorLoaded from './DetectorLoaded'
import { useCleanupLater } from '../../util/use-cleanup-later'

// TODO: Start mediaStream > play video and do this at same time
const DetectorStarter = observer<DetectorStarterProps>(props => {
  const [promise, setPromise] = useState<Data<PoseDetector>>()

  const cleanupLater = useCleanupLater()
  useEffect(() => setPromise(initialize((async () => {
    await setBackend('webgl')
    const detector = await createDetector(SupportedModels.MoveNet, { modelType: movenet.modelType.SINGLEPOSE_THUNDER })
    cleanupLater(() => detector.dispose())
    return detector
  })())), [])

  return (
    <>
      {promise !== undefined && switchCase<PoseDetector, ReactNode>(
        promise,
        detector => <DetectorLoaded {...props} {...{ detector }} />,
        () => 'Creating Detector',
        () => 'Error creating detector')}
    </>
  )
})

export default DetectorStarter
