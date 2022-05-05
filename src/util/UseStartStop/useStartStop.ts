import { UseStartStopInput } from '.'
import useConstant from 'use-constant'
import { useEffect } from 'react'

const useStartStop = <T>({
  startStop: { start, stop },
  initializeStartStopData
}: UseStartStopInput<T>): void => {
  const startStopData = useConstant(initializeStartStopData)
  useEffect(() => {
    start(startStopData)
    return () => stop(startStopData)
  }, [])
}

export default useStartStop
