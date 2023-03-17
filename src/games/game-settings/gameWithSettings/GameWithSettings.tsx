import Props from './Props'
import 'react-edit-text/dist/index.css'
import PlayerInputsPresets from './playerInputsPresets/PlayerInputsPresets'
import get from 'observables/lib/syncAsync/get/get'
import set from 'observables/lib/syncAsync/set/set'
import reactObserver from 'observables/lib/reactObserver/reactObserver'
import useConstant from 'use-constant'
import createGameSettingsSyncAsync from './createGameSettingsSyncAsync/createGameSettingsSyncAsync'
import { Spin } from 'antd'

const GameWithSettings = reactObserver<Props, HTMLDivElement>((observe, props, ref) => {
  const syncAsync = useConstant(() => createGameSettingsSyncAsync(props))
  const syncAsyncData = observe(get(syncAsync))

  return (
    // TODO: Save and load presets to indexed db
    // FIXME: Ref
    <div ref={ref}>
      <Spin tip='Loading settings' spinning={!syncAsyncData.loadPromiseData.done}>
        {syncAsyncData.data !== undefined && (
          <PlayerInputsPresets
            playerInputs={props.playerInputs}
            value={syncAsyncData.data.playerInputsPresets}
            onChange={newData => {
              set({
                syncAsync,
                newData: {
                  ...syncAsyncData.data,
                  playerInputsPresets: newData
                }
              })
            }}
          />
        )}
        {syncAsyncData.loadPromiseData.done && !syncAsyncData.loadPromiseData.result.success &&
        'Error'}
      </Spin>
    </div>
  )
})

export default GameWithSettings
