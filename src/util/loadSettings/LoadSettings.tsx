import { observer } from 'mobx-react-lite'
import LoadSettingsProps from './LoadSettingsProps'
import { Progress } from 'antd'
import { css } from '@emotion/css'
import { useState, useEffect } from 'react'
import { initialize, getState, PromiseState } from '../mobxObservablePromise'

const LoadSettings = observer<LoadSettingsProps>(({ settings, children }) => {
  useEffect(() => {
    settings.forEach(({ autoSaveData, saveFns: { autoSave: { start } } }) => {
      start(autoSaveData)
    })
    return () => {
      settings.forEach(({ autoSaveData, saveFns: { autoSave: { stop } } }) => {
        stop(autoSaveData)
      })
    }
  }, [])

  const [loadPromises] = useState(() =>
    settings.map(({ saveData, saveFns: { load } }) => initialize(load(saveData))))

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
