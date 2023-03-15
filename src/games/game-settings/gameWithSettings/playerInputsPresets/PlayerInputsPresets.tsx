import { Spin, Tabs } from 'antd'
import reactObserver from 'observables/lib/reactObserver/reactObserver'
import useConstant from 'use-constant'
import createGameSettingsSyncAsync from '../createGameSettingsSyncAsync/createGameSettingsSyncAsync'
import get from 'observables/lib/syncAsync/get/get'
import set from 'observables/lib/syncAsync/set/set'
import never from 'never'
import Props from '../Props'
import TabLabel from './tabLabel/TabLabel'

const PlayerInputsPresets = reactObserver<Props>((observe, props) => {
  const syncAsync = useConstant(() => createGameSettingsSyncAsync(props))
  const syncAsyncData = observe(get(syncAsync))

  return (
    <Spin tip='Loading settings' spinning={!syncAsyncData.loadPromiseData.done}>
      {syncAsyncData.data?.settingsPresets.map(({ name }) => name)}
      <Tabs
        type='editable-card'
        items={syncAsyncData.data?.playerInputsPresets.map((preset, index) => ({
          key: index.toString(),
          label: (
            <TabLabel
              name={preset.name}
              onChange={newName => {
                const data = syncAsyncData.data ?? never()
                set({
                  syncAsync,
                  newData: {
                    ...data,
                    playerInputsPresets: [
                      ...data.playerInputsPresets.slice(0, index),
                      {
                        ...preset,
                        name: newName
                      },
                      ...data.playerInputsPresets.slice(index + 1)
                    ]
                  }
                })
              }}
            />
          ),
          children: 'Content'
        }))}
        onEdit={(targetKey, action) => {
          console.log(targetKey, action)
        }}
      />
      {syncAsyncData.loadPromiseData.done && !syncAsyncData.loadPromiseData.result.success &&
        'Error'}
    </Spin>
  )
})

export default PlayerInputsPresets
