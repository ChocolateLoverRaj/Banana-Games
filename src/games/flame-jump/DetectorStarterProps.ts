import VideoStarterProps from './VideoStarterProps'
import { RefObject } from 'react'

interface DetectorStarterProps extends VideoStarterProps {
  videoRef: RefObject<HTMLVideoElement>
}

export default DetectorStarterProps
