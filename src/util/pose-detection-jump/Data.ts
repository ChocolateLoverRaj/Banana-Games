import Options from './Options'
import RecordedY from './RecordedY'

interface Data {
  options: Options
  data: {
    recordedYs: RecordedY[]
    lastSpeed: number
    isInAir: boolean
    distanceFromGround: number
  }
}

export default Data
