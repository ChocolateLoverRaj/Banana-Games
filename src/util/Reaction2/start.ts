import Reaction from './Reaction'
import TriggerReaction from './TriggerReaction'

const start = <T>(
  { reactionData, reactionFns: { reaction, cleanup } }: Reaction<T, unknown>
): void => {
  // eslint-disable-next-line prefer-const
  let cleanupData: unknown
  const triggerReaction: TriggerReaction = () => {
    cleanup?.(reactionData, cleanupData)
    reaction(triggerReaction, reactionData)
  }
  cleanupData = reaction(triggerReaction, reactionData)
}

export default start
