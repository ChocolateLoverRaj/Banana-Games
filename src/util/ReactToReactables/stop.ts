import ReactToReactablesReturnValue from './ReactToReactablesReturnValue'

const stop = ({ updateReactables }: ReactToReactablesReturnValue): void => {
  updateReactables([])
}

export default stop
