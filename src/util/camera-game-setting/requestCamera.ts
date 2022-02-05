import { initialize } from '../mobx-observable-promise'

const requestCamera = initialize(navigator.mediaDevices.getUserMedia({ video: true }))

export default requestCamera
