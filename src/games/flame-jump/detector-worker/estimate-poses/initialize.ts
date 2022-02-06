import Data from './Data'
import never from 'never'

const initialize = (detectorWorker: Worker, video: HTMLVideoElement): Data => {
  const canvas = document.createElement('canvas')
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight
  return {
    detectorWorker,
    video,
    ctx: canvas.getContext('2d') ?? never()
  }
}

export default initialize
