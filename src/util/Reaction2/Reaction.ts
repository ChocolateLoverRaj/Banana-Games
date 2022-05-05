import ReactionFns from './ReactionFns'

interface Reaction<ReactionData, CleanupData> {
  reactionData: ReactionData
  reactionFns: ReactionFns<ReactionData, CleanupData>
}

export default Reaction
