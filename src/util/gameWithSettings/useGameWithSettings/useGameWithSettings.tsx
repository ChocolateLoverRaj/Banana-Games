import {
  UseGameWithSettingsResult,
  Input,
  ReferencePauseEmitter,
  ReferencePauseEmitterValue
} from '.'
import { openDb } from '../../indexedDb'
import useConstant from 'use-constant'
import { ReferenceManager, ObservableValue, ObservablePromise, Reaction } from '../..'
import never from 'never'
import { Listener, emit } from 'emitter2'
import ScreenEnum from '../ScreenEnum'
import gameSettingsDb from './gameSettingsDb'
import { ReferenceIsPressed } from '../../booleanGameSettings'
import { set } from '../../ObservableValue'
import PauseEmitter from '../../PauseEmitter'
import PromiseState from '../../../types/PromiseState'
import { useStartStop } from '../../UseStartStop'
import { Cleanup } from '../../Reaction'
import getDbKey from '../../getDbKey'

/**
 * @param param0 Must be constant, no changing or inputting different object
 */
const useGameWithSettings = ({
  settings,
  idPrefix,
  pauseSetting
}: Input): UseGameWithSettingsResult => {
  const gameSettingsLoadable = useConstant(() => new Map(settings.map(setting => [
    setting,
    ReferenceManager.create<ObservablePromise.ObservablePromise<any>>({
      load: () => ObservablePromise.create((async () => {
        const dbKey = getDbKey(idPrefix, setting)
        const db = await openDb(gameSettingsDb)
        const saveData = setting.fns.initializeSaveData({
          settingData: setting.defaultData,
          id: setting.id
        })
        const transaction = db.transaction([setting.fns.dbStoreName], 'readwrite')
        const store = transaction.objectStore(setting.fns.dbStoreName)
        if (await store.getKey(dbKey) !== undefined) {
          await setting.fns.saveFns.load(saveData, await store.get(dbKey))
        } else {
          await store.put(setting.fns.saveFns.save(saveData), dbKey)
        }
        db.close()
        return {
          saveData: saveData,
          data: setting.defaultData,
          context: setting.fns.initializeContext()
        }
      })())
    })])))

  const screen = useConstant(() => ObservableValue.create(ScreenEnum.PLAYING))

  const referencePauseEmitter: ReferencePauseEmitter | undefined = useConstant(() => {
    if (pauseSetting === undefined) return undefined
    return ReferenceManager.create<ReferencePauseEmitterValue>({
      load: () => {
        const referenceManager = gameSettingsLoadable.get(pauseSetting) ?? never()
        let canceled = false
        const cleanupFns: Array<() => void> = [() => {
          canceled = true
        }]
        const observablePromise = ReferenceManager.reference(referenceManager)
        cleanupFns.push(() => {
          ReferenceManager.unReference(referenceManager)
        })

        return {
          cleanupFns,
          observablePromise: ObservablePromise.create((async () => {
            const { data, context } = await observablePromise.promise
            if (canceled) return
            const referenceIsPressed = ReferenceIsPressed.create(data, context)
            const referencePauseEmitter: PauseEmitter =
              ReferenceManager.Emitter.create<[], Listener<[boolean]>>({
                load: emitter => {
                  const listener: Listener<[boolean]> = () => {
                    console.log(referenceIsPressed.value[0])
                    if (referenceIsPressed.value[0]) emit(emitter)
                  }
                  ReferenceManager.Emitter.add(
                    referenceIsPressed.referenceManagerEmitter,
                    listener)
                  return listener
                },
                unload: (_, listener) => {
                  ReferenceManager.Emitter.deleteValue(
                    referenceIsPressed.referenceManagerEmitter,
                    listener)
                }
              })
            cleanupFns.push(() => {
              ReferenceManager.unReference(referenceManager)
            })
            return referencePauseEmitter
          })())
        }
      },
      unload: ({ cleanupFns }) => cleanupFns.forEach(cleanupFn => cleanupFn())
    })
  })

  if (referencePauseEmitter !== undefined) {
    // Pause game when pause is pressed
    useStartStop({
      startStop: Reaction.startStop,
      initializeStartStopData: () => Reaction.create(() => {
        const { observablePromise } = ReferenceManager.reference(referencePauseEmitter)

        // Keep the promise reaction separate from this reaction
        // This way the code outside this function won't get called on promise updates
        const promiseReaction = Reaction.create(triggerReaction => {
          observablePromise.emitter.add(triggerReaction)

          let maybeCleanup: Cleanup | undefined
          if (observablePromise.state === PromiseState.RESOLVED) {
            const pauseEmitterListener: Listener<[]> = () => {
              if (screen.value === ScreenEnum.PLAYING) {
                set(screen, ScreenEnum.PAUSED)
                // For some reason, onTouchEnd is not fired on pause button
                // So we manually emit as released touch
                emit(gameSettingsLoadable.get(pauseSetting ?? never())
                  ?.loadedValue.value?.result.context ?? never(), false)
              }
            }
            ReferenceManager.Emitter.add(observablePromise.result, pauseEmitterListener)
            maybeCleanup = () => {
              ReferenceManager.Emitter.deleteValue(observablePromise.result, pauseEmitterListener)
            }
          }

          return () => {
            observablePromise.emitter.delete(triggerReaction)
            maybeCleanup?.()
          }
        })
        Reaction.start(promiseReaction)

        return () => {
          ReferenceManager.unReference(referencePauseEmitter)
          Reaction.stop(promiseReaction)
        }
      })
    })
  }

  return {
    gameSettingsLoadable,
    screen,
    referencePauseEmitter,
    idPrefix
  }
}

export default useGameWithSettings
