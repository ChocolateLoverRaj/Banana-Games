import { LoadedSetting } from '../useGameWithSettings'
import { Reaction, TriggerReaction } from '../../Reaction2'
import { ObservablePromise } from '../../ObservablePromise'
import AutoSaveReactionCleanupData from './AutoSaveReactionCleanupData'

type AutoSaveReaction =
  Reaction<ObservablePromise<LoadedSetting>, AutoSaveReactionCleanupData | TriggerReaction>

export default AutoSaveReaction
