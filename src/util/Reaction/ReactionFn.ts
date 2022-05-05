import { TriggerReaction, Cleanup } from '.'

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
type ReactionFn = (triggerReaction: TriggerReaction) => Cleanup | void

export default ReactionFn
