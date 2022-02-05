import { Keypoint } from '@tensorflow-models/pose-detection'

const flipKeypointsX = (normalizedKeypoints: Keypoint[]): Keypoint[] =>
  normalizedKeypoints.map(keypoint => ({
    ...keypoint,
    x: 1 - keypoint.x
  }))

export default flipKeypointsX
