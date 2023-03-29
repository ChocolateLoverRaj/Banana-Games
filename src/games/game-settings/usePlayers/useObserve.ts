import useRerender from '@utilityjs/use-force-rerender'
import Observable from 'observables/lib/Observable'
import { useEffect } from 'react'

const useObserve = <T>(observable: Observable<T>): T => {
  const rerender = useRerender()
  useEffect(() => {
    observable.addRemove.add(rerender)
    return () => observable.addRemove.remove(rerender)
  })

  return observable.getValue()
}

export default useObserve
