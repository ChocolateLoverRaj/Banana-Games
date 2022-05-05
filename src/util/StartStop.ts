interface StartStop<T> {
  start: (startStopData: T) => void
  stop: (startStopData: T) => void
}

export default StartStop
