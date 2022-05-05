import Reaction from './Reaction'

const stop = <T> ({ reactionData, reactionFns: { cleanup } }: Reaction<T>): void => {
  cleanup?.(reactionData)
}

export default stop
