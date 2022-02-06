import { useEffect, useState, ReactNode } from 'react'
import { observer } from 'mobx-react-lite'
import { Data, initialize, switchCase } from '../../util/mobx-observable-promise'
import '@tensorflow/tfjs-backend-webgl'
import DetectorStarterProps from './DetectorStarterProps'
import DetectorLoaded from './DetectorLoaded'
import { useCleanupLater } from '../../util/use-cleanup-later'
import WorkerToPage from './detector-worker/WorkerToPage'

// TODO: Start mediaStream > play video and do this at same time
const DetectorStarter = observer<DetectorStarterProps>(props => {
  const [promise, setPromise] = useState<Data<Worker>>()

  const cleanupLater = useCleanupLater()
  useEffect(() => setPromise(initialize((async () => {
    const worker = new Worker(new URL(
      './detector-worker/detectorWorker.ts', import.meta.url), { type: 'module' })
    await new Promise<void>((resolve, reject) => {
      worker.onerror = reject
      worker.onmessageerror = reject
      worker.onmessage = ({ data }) => {
        if (data === WorkerToPage.SUCCESS) {
          resolve()
        } else {
          reject(new Error('Error setting up detector'))
        }
      }
    })
    cleanupLater(() => worker.terminate())
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
