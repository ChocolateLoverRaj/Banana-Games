import { FC, useEffect } from 'react'
import PromiseState from '../../../../types/PromiseState'
import { unReference, reference } from '../../../ReferenceManager'
import LoadedGameProps from '../LoadedGameProps'
import Loaded from './Loaded'
import never from 'never'
import useRerender from '@utilityjs/use-force-rerender'

const Pauseable: FC<LoadedGameProps> = props => {
  const referencePauseEmitter = props.game.referencePauseEmitter ?? never()

  // TODO: Messy, make it nice
  const reRender = useRerender()
  useEffect(() => {
    const { observablePromise } = reference(referencePauseEmitter)
    observablePromise.emitter.add(reRender)
    return () => {
      unReference(referencePauseEmitter)
      observablePromise.emitter.delete(reRender)
    }
  }, [])

  const observablePromise = referencePauseEmitter.loadedValue.value?.observablePromise
  const promiseState = observablePromise?.state
  return (
    <>
      {promiseState === PromiseState.RESOLVED
        ? <Loaded {...props} pauseEmitter={observablePromise?.result} />
        : promiseState === undefined || promiseState === PromiseState.PENDING
          ? 'Loading pause input'
          // TODO: Retry
          : 'Error loading pause input'}
    </>
  )
}

export default Pauseable
