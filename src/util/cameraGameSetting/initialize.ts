import { observable, createAtom, action, runInAction } from 'mobx'
import Data from './Data'
import requestCamera from './requestCamera'
import { initialize as initializePromise, PromiseState } from '../mobxObservablePromise'
import stopMediaStream from 'stop-media-stream'
import { autorunCleanup, Cleanup } from 'mobx-autorun-cleanup'

const initialize = (name: string): Data => {
  const afterResolveCb = action((mediaStream: MediaStream): void => {
    data.cameraId.set(mediaStream.getTracks()[0].getSettings().deviceId)
    if (!mediaStreamAtom.isBeingObserved_) {
      stopMediaStream(mediaStream)
    }
  })
  let stopAutorun: Cleanup
  const mediaStreamAtom = createAtom(
    'MediaStream',
    () => {
      stopAutorun = autorunCleanup(() => {
        const promise = navigator.mediaDevices.getUserMedia({
          video: { deviceId: data.cameraId.get() }
        })
        const observablePromise = initializePromise(promise)
        runInAction(() => {
          data.mediaStreamPromise.set(observablePromise)
        })
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        promise.then(afterResolveCb)
        return () => {
          if (observablePromise?.state === PromiseState.RESOLVED) {
            stopMediaStream(observablePromise.data)
          }
        }
      })
    },
    () => {
      data.mediaStreamPromise.set(undefined)
      stopAutorun()
    })
  const data: Data = {
    name,
    cameraId: observable.box(undefined, { deep: false }),
    mediaStreamAtom,
    mediaStreamPromise: observable.box(requestCamera, { deep: false })
  }
  requestCamera.data.then(afterResolveCb)
  return data
}

export default initialize
