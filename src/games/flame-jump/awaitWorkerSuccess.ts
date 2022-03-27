import { WorkerToPage } from './detectorWorker'

const awaitWorkerSuccess = async (worker: Worker): Promise<void> => {
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
}

export default awaitWorkerSuccess
