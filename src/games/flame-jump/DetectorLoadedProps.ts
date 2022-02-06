import DetectorStarterProps from './DetectorStarterProps'

interface DetectorLoadedProps extends DetectorStarterProps {
  detectorWorker: Worker
}

export default DetectorLoadedProps
