import TriggerReaction from './TriggerReaction'

interface ReactionFns<ReactionData, CleanupData> {
  reaction: (triggerReaction: TriggerReaction, reactionData: ReactionData) => CleanupData
  cleanup?: (reactionData: ReactionData, cleanupData: CleanupData) => void
}

export default ReactionFns
