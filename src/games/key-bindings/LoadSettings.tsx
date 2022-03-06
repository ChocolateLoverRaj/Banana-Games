import { observer } from 'mobx-react-lite'
import LoadSettingsProps from './LoadSettingsProps'
import { Progress } from 'antd'
import { css } from '@emotion/css'
import { useState, useEffect } from 'react'
import { AutoSaveData, start, stop } from '../../util/boolean-game-settings/auto-save'
import { initialize, getState, PromiseState } from '../../util/mobx-observable-promise'
import { load } from '../../util/boolean-game-settings/save'

const LoadSettings = observer<LoadSettingsProps>(({ settings, idPrefix, children }) => {
  const [autoSaves] = useState<readonly AutoSaveData[]>(() => settings.map(setting => ({
    saveData: {
      settings: setting,
      id: `${idPrefix}-${setting.name}`
    }
  })))
  useEffect(() => {
    autoSaves.map(start)
    return () => {
      autoSaves.map(stop)
    }
  }, [])

  const [loadPromises] = useState(() =>
    autoSaves.map(autoSave => initialize(load(autoSave.saveData))))

  const nLoaded = loadPromises.reduce(
    (count, loadPromise) => count + Number(getState(loadPromise) === PromiseState.RESOLVED), 0)

  const isError = loadPromises.some(loadPromise => getState(loadPromise) === PromiseState.REJECTED)

  const total = settings.length

  return (
    <>
      {nLoaded < total
        ? (
          <div className={css({ display: 'flex', flexDirection: 'column' })}>
            {!isError
              ? 'Loading game settings'
              : 'Error loading game settings'}
            <div>
              <Progress
                steps={total}
                percent={nLoaded / total * 100}
                format={() => `${nLoaded} / ${settings.length}`}
                status={isError ? 'exception' : 'active'}
              />
            </div>
          </div>)
        : children}
    </>
  )
})

export default LoadSettings
