import { SupportedModels } from '@tensorflow-models/pose-detection'
import { Object3D, Vector3, BufferGeometry } from 'three'

interface Data {
  model: SupportedModels
  object3D: Object3D
  pointsBufferGeometry: BufferGeometry
  pointsVector3Arr: Vector3[]
  lineSegmentsBufferGeometry: BufferGeometry
  lineSegmentsVector3Arr: Vector3[]
}

export default Data
