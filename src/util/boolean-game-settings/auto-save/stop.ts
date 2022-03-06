import AutoSaveData from './AutoSaveData'

const stop = (autoSave: AutoSaveData): void => {
  autoSave.stop?.stopReactions.map(stopReaction => stopReaction())
  autoSave.stop?.dbPromise.then(db => db.close())
}

export default stop
