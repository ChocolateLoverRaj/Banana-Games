import DetectorStarterProps from './DetectorStarterProps'
import { PoseDetector } from '@tensorflow-models/pose-detection'

interface DetectorLoadedProps extends DetectorStarterProps {
  detector: PoseDetector
}

export default DetectorLoadedProps
