import AutoSaveData from './AutoSaveData'

const stop = (autoSave: AutoSaveData): void => {
  autoSave.stop?.stopReaction()
  autoSave.stop?.dbPromise.then(db => db.close())
}

export default stop
