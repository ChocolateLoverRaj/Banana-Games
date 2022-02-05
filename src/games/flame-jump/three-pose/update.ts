import Data from './Data'
import { Keypoint, util } from '@tensorflow-models/pose-detection'
import getLowestPointY from '../../../util/getLowestPointY'

const update = ({
  model,
  pointsVector3Arr,
  pointsBufferGeometry,
  lineSegmentsVector3Arr,
  lineSegmentsBufferGeometry
}: Data, normalizedKeypoints: Keypoint[]): void => {
  const lowestY = getLowestPointY(normalizedKeypoints)
  const centerX = (normalizedKeypoints[11].x + normalizedKeypoints[12].x) / 2
  normalizedKeypoints.forEach(({ x, y }, index) => {
    const point = pointsVector3Arr[index]
    point.x = x - centerX
    point.y = lowestY - y
  })
  pointsBufferGeometry.setFromPoints(pointsVector3Arr)

  util.getAdjacentPairs(model).flat().forEach((keypointIndex, index) => {
    const point = lineSegmentsVector3Arr[index]
    const { x, y } = normalizedKeypoints[keypointIndex]
    point.x = x - centerX
    point.y = lowestY - y
  })
  lineSegmentsBufferGeometry.setFromPoints(lineSegmentsVector3Arr)
}

export default update
