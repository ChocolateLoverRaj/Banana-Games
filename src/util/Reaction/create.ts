import { ReactionFn, TriggerReaction, Reaction } from '.'

const create = (reactionFn: ReactionFn): Reaction => {
  const triggerReaction: TriggerReaction = () => {
    reaction.cleanup?.()
    reaction.cleanup = reactionFn(triggerReaction)
  }
  const reaction: Reaction = {
    triggerReaction,
    cleanup: undefined
  }
  return reaction
}

export default create
