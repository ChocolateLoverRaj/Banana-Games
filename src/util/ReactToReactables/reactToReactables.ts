import { Reactable } from '..'
import { Listener } from 'emitter2'
import arrDiff from 'arr-diff'
import { UpdateReactables, RunThisOnReaction, ReactToReactablesReturnValue } from '.'

const reactToReactables = (
  runThisOnReaction: RunThisOnReaction
): ReactToReactablesReturnValue => {
  let reactables: ReadonlyArray<Reactable<unknown>> = []
  const listener: Listener<[]> = () => {
    updateReactables(runThisOnReaction())
  }
  const updateReactables: UpdateReactables = newReactables => {
    arrDiff(reactables, newReactables).forEach(({ listeners, addDelete: { deleteValue } }) => {
      deleteValue(listeners, listener)
    })
    console.trace(newReactables, reactables)
    arrDiff(newReactables, reactables).forEach(({ listeners, addDelete: { add } }) => {
      add(listeners, listener)
    })
    reactables = newReactables
  }
  return { updateReactables, runThisOnReaction }
}

export default reactToReactables
