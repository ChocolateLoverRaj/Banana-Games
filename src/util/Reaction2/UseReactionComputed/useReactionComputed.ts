import useForceRerender from '@utilityjs/use-force-rerender'
import { useEffect } from 'react'
import GetObserve from '../../GetObserve'
import { add, deleteValue } from '../../ReferenceManager/Emitter'

const useReactionComputed = <Input, TReturn>(
  { get, observe }: GetObserve<Input, TReturn>,
  input: Input
): TReturn => {
  const reRender = useForceRerender()

  useEffect(() => {
    const referenceEmitter = observe(input)
    add(referenceEmitter, reRender)

    return () => {
      deleteValue(referenceEmitter, reRender)
    }
  }, [])

  return get(input)
}

export default useReactionComputed
