import { Pose } from '@tensorflow-models/pose-detection'
import Data from './Data'

const estimatePoses = async ({ detectorWorker, ctx, video }: Data): Promise<Pose[]> => {
  ctx.drawImage(video, 0, 0)
  const imageData = ctx.getImageData(0, 0, video.videoWidth, video.videoHeight)
  detectorWorker.postMessage(imageData)
  return await new Promise<Pose[]>((resolve, reject) => {
    detectorWorker.onerror = reject
    detectorWorker.onmessageerror = reject
    detectorWorker.onmessage = ({ data }) => {
      if (data instanceof Array) {
        resolve(data)
      } else {
        reject(new Error('Error estimating poses'))
      }
    }
  })
}

export default estimatePoses
