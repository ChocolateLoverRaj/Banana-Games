import StartStop from '../StartStop'

interface UseStartStopInput<T> {
  initializeStartStopData: () => T
  startStop: StartStop<T>
}

export default UseStartStopInput
