import { Table, message } from 'antd'
import { FC } from 'react'
import NameColumn from './NameColumn'
import EditColumn from './EditColumn'
import ResetColumn from './ResetColumn'
import EditGameSettingsProps from './EditGameSettingsProps'
import EditGameSettingsContextData from './EditGameSettingsContextData'
import { ReferenceManager } from '../..'
import EditGameSettingsContext from './EditGameSettingsContext'
import getObserveLoadedSetting from './getObserveLoadedSetting'
import never from 'never'
import { Listener } from 'emitter2'
import getDbKey from '../../getDbKey'
import { openDb } from '../../indexedDb'
import { gameSettingsDb } from '../useGameWithSettings'
import { reference } from '../../ReferenceManager'
import PromiseState from '../../../types/PromiseState'
import { start, stop } from '../../Reaction2'
import AutoSaveReaction from './AutoSaveReaction'

const EditGameSettings: FC<EditGameSettingsProps> = ({ game }) => {
  const contextData: EditGameSettingsContextData = ReferenceManager.Map.create({
    load: setting => {
      const loadedSetting = game.gameSettingsLoadable.get(setting) ??
        never()
      const observablePromise = reference(loadedSetting)
      const reaction: AutoSaveReaction = {
        reactionData: observablePromise,
        // TODO: Move these fns to be reused with any observable promise
        reactionFns: {
          reaction: (triggerReaction, observablePromise) => {
            if (observablePromise.state === PromiseState.REJECTED) {
              throw new Error(
                "Can't watch for changes to setting because error loading setting data",
                { cause: observablePromise.result })
            }
            if (observablePromise.state === PromiseState.RESOLVED) {
              const {
                saveData,
                data
              } = getObserveLoadedSetting.get(loadedSetting) ?? never()
              console.log('Should start auto-saving changes for', setting, data)
              const watchData = setting.fns.saveFns.watchChanges.initializeWatchData(saveData)
              const listener: Listener<[]> = () => {
                console.log('Game setting changed', setting, 'Should save changes');
                (async () => {
                  const dbKey = getDbKey(game.idPrefix, setting)
                  const db = await openDb(gameSettingsDb)
                  const transaction = db.transaction([setting.fns.dbStoreName], 'readwrite')
                  const store = transaction.objectStore(setting.fns.dbStoreName)
                  await store.put(setting.fns.saveFns.save(saveData), dbKey)
                  db.close()
                })().catch(e => {
                  console.error(e)
                  // eslint-disable-next-line no-void
                  void message.error('Error saving game setting')
                })
              }
              setting.fns.saveFns.watchChanges.addDelete.add(watchData, listener)
              return { watchData, listener }
            }
            observablePromise.emitter.add(triggerReaction)
            return triggerReaction
          },
          cleanup: (observablePromise, cleanupData) => {
            console.log(cleanupData)
            if (typeof cleanupData === 'function') {
              observablePromise.emitter.delete(cleanupData)
            } else {
              const { watchData, listener } = cleanupData
              setting.fns.saveFns.watchChanges.addDelete.deleteValue(watchData, listener)
            }
          }
        }
      }
      start(reaction)
      return reaction
    },
    unload: (setting, reaction) => {
      console.log('Should stop auto-saving changes for', setting)
      stop(reaction)
    }
  })

  return (
    <EditGameSettingsContext.Provider value={contextData}>
      <Table
        title={() => 'Game Settings'}
        dataSource={[...game.gameSettingsLoadable]}
        columns={[{
          title: 'Name',
          render: (_, keyValue) => <NameColumn keyValue={keyValue} />
        }, {
          title: 'Edit',
          render: (_, keyValue) => <EditColumn keyValue={keyValue} />
        }, {
          title: 'Reset',
          render: (_, keyValue) => <ResetColumn keyValue={keyValue} />
        }]}
        pagination={{ hideOnSinglePage: true }}
        rowKey={([{ id }]) => id}
      />
    </EditGameSettingsContext.Provider>
  )
}

export default EditGameSettings
