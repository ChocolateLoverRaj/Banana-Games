import { SaveGameSettingFns } from '../../gameSetting'
import { load, save, SaveData } from '.'
import { reaction, toJS, IReactionDisposer } from 'mobx'
import * as ReferenceManager from '../../ReferenceManager'
import { emit } from 'emitter2'
import pick from 'object.pick'

const saveFns: SaveGameSettingFns<SaveData> = {
  load,
  save,
  watchChanges: {
    initializeWatchData: ({ settings }) => ReferenceManager.Emitter.create<[], IReactionDisposer>({
      load: emitter => reaction(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        [...settings.keyBindings]
        return pick(toJS(settings), ['keyBindings', 'screenRects'])
      }, () => {
        emit(emitter)
      }),
      unload: (_, dispose) => dispose()
    }),
    addDelete: ReferenceManager.Emitter.addDelete
  }
}

export default saveFns
