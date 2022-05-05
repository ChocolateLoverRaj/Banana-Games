import { Cleanup, TriggerReaction } from '.'

interface Reaction {
  triggerReaction: TriggerReaction
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  cleanup: Cleanup | void
}

export default Reaction
