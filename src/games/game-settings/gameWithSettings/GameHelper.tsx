import Props from './Props'
import 'react-edit-text/dist/index.css'
import PlayerInputsPresets from './playerInputsPresets/PlayerInputsPresets'
import get from 'observables/lib/syncAsync/get/get'
import set from 'observables/lib/syncAsync/set/set'
import reactObserver from 'observables/lib/reactObserver/reactObserver'
import { Spin } from 'antd'

const GameHelper = reactObserver<Props, HTMLDivElement>((
  observe,
  { game: { input, syncAsync } },
  ref
) => {
  const syncAsyncData = observe(get(syncAsync))

  return (
    // TODO: Save and load presets to indexed db
    // FIXME: Ref
    <div ref={ref}>
      <Spin tip='Loading settings' spinning={!syncAsyncData.loadPromiseData.done}>
        {syncAsyncData.data !== undefined && (
          <PlayerInputsPresets
            playerInputs={input.playerInputs}
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
GameHelper.displayName = 'Helper game component'
export default GameHelper
