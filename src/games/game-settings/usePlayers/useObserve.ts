import useRerender from '@utilityjs/use-force-rerender'
import Observable from 'observables/lib/Observable'
import { useEffect } from 'react'

const useObserve = <T>(observable: Observable<T>, debug = false): T => {
  const _rerender = useRerender()
  const rerender = () => {
    _rerender()
    if (debug) console.trace('rerender', observable.getValue(), _rerender())
  }
  useEffect(() => {
    observable.addRemove.add(rerender)
    return () => observable.addRemove.remove(rerender)
  }, [observable])

  return observable.getValue()
}

export default useObserve
