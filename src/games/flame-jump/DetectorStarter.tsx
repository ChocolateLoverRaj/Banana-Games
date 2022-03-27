import { useEffect, useState, ReactNode } from 'react'
import { observer } from 'mobx-react-lite'
import { Data, initialize, switchCase } from '../../util/mobxObservablePromise'
import '@tensorflow/tfjs-backend-webgl'
import DetectorStarterProps from './DetectorStarterProps'
import DetectorLoaded from './DetectorLoaded'
import { useCleanupLater } from '../../util/useCleanupLater'
import { autorun } from 'mobx'
import modelTypeSetting from './modelTypeSetting'
import awaitWorkerSuccess from './awaitWorkerSuccess'

// TODO: Start mediaStream > play video and do this at same time
const DetectorStarter = observer<DetectorStarterProps>(props => {
  const [promise, setPromise] = useState<Data<Worker>>()

  const cleanupLater = useCleanupLater()
  useEffect(() => setPromise(initialize((async () => {
    const worker = new Worker(new URL(
      './detectorWorker/detectorWorker.ts', import.meta.url), { type: 'module' })
    await awaitWorkerSuccess(worker)
    const stopAutorun = autorun(() => {
      worker.postMessage(modelTypeSetting.data.selectedOption)
    })
    await awaitWorkerSuccess(worker)
    cleanupLater(() => {
      worker.terminate()
      stopAutorun()
    })
    return worker
  })())), [])

  return (
    <>
      {promise !== undefined && switchCase<Worker, ReactNode>(
        promise,
        detectorWorker => <DetectorLoaded {...props} {...{ detectorWorker }} />,
        () => 'Creating Detector',
        () => 'Error creating detector')}
    </>
  )
})

export default DetectorStarter
