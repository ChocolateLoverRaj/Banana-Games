interface SaveGameSettingFns<SaveData, AutoSaveData> {
  load: (saveData: SaveData) => Promise<void>
  autoSave: {
    start: (autoSaveData: AutoSaveData) => void
    stop: (autoSaveData: AutoSaveData) => void
  }
}

export default SaveGameSettingFns
