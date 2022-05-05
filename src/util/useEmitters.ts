import { useEffect } from 'react'
import useForceRerender from '@utilityjs/use-force-rerender'
import { Data as Emitter } from 'emitter2'
import arrDiff from 'arr-diff'
import { usePreviousImmediate } from 'rooks'

// TODO: Use useReactables and deprecate this fn
const useEmitters = (emitters: ReadonlyArray<Emitter<[]>>): void => {
  const forceRerender = useForceRerender()
  const previousEmitters = usePreviousImmediate(emitters) ?? []

  useEffect(() => {
    arrDiff(previousEmitters, emitters).forEach(emitter => emitter.delete(forceRerender))
    arrDiff(emitters, previousEmitters).forEach(emitter => emitter.add(forceRerender))
  }, [previousEmitters, emitters])

  useEffect(() => () => {
    emitters.forEach(emitter => emitter.delete(forceRerender))
  }, [])
}

export default useEmitters
