import { initialize } from '../mobxObservablePromise'

const requestCamera = initialize(navigator.mediaDevices.getUserMedia({ video: true }))

export default requestCamera
