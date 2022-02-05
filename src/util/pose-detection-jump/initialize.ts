import Data from './Data'
import defaultOptions from './defaultOptions'

const initialize = (options = defaultOptions): Data => {
  return {
    options,
    data: {
      isInAir: false,
      lastSpeed: 0,
      recordedYs: [],
      distanceFromGround: 0
    }
  }
}

export default initialize
