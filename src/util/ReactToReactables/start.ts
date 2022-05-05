import ReactToReactablesReturnValue from './ReactToReactablesReturnValue'

const start = ({ updateReactables, runThisOnReaction }: ReactToReactablesReturnValue): void => {
  updateReactables(runThisOnReaction())
}

export default start
