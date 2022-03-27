import { Object3D, Points, BufferGeometry, Vector3, LineSegments } from 'three'
import { util, SupportedModels } from '@tensorflow-models/pose-detection'
import Data from './Data'

const initialize = (model: SupportedModels): Data => {
  const object3D = new Object3D()

  const pointsLength = Object.keys(util.getKeypointIndexByName(model)).length
  const pointsVector3Arr: Vector3[] = []
  for (let i = 0; i < pointsLength; i++) {
    pointsVector3Arr.push(new Vector3())
  }

  const pointsBufferGeometry = new BufferGeometry().setFromPoints(pointsVector3Arr)
  const points = new Points(pointsBufferGeometry)
  object3D.add(points)

  const linesLength = util.getAdjacentPairs(model).length
  const lineSegmentsVector3Arr: Vector3[] = []
  for (let i = 0; i < linesLength; i++) {
    lineSegmentsVector3Arr.push(new Vector3(), new Vector3())
  }
  const lineSegmentsBufferGeometry = new BufferGeometry().setFromPoints(lineSegmentsVector3Arr)
  const lineSegments = new LineSegments(lineSegmentsBufferGeometry)
  object3D.add(lineSegments)

  return {
    model,
    object3D,
    pointsBufferGeometry,
    pointsVector3Arr,
    lineSegmentsBufferGeometry,
    lineSegmentsVector3Arr
  }
}

export default initialize
