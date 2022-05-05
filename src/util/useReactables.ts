import { useEffect } from 'react'
import useForceRerender from '@utilityjs/use-force-rerender'
import arrDiff from 'arr-diff'
import { usePreviousImmediate } from 'rooks'
import Reactable from './Reactable'

const useReactables = (reactables: ReadonlyArray<Reactable<any>>): void => {
  const forceRerender = useForceRerender()
  const previousReactables = usePreviousImmediate(reactables) ?? []

  useEffect(() => {
    arrDiff(previousReactables, reactables).forEach(({ listeners, addDelete: { deleteValue } }) => deleteValue(listeners, forceRerender))
    arrDiff(reactables, previousReactables).forEach(({ listeners, addDelete: { add } }) => add(listeners, forceRerender))
  }, [previousReactables, reactables])

  useEffect(() => () => {
    reactables.forEach(({ listeners, addDelete: { deleteValue } }) => deleteValue(listeners, forceRerender))
  }, [])
}

export default useReactables
