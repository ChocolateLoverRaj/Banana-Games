import { Tabs } from 'antd'
import reactObserver from 'observables/lib/reactObserver/reactObserver'
import PlayerIosPresetType from '../../PlayerIosPresetType'
import Props from './Props'
import TabContent from './tabContent/TabContent'
import TabLabel from './tabLabel/TabLabel'
import { v4 as uuid4 } from 'uuid'
import readOnlyMapRemove from '../../../../util/readOnlyMapRemove/readOnlyMapRemove'

const PlayerInputsPresets = reactObserver<Props>((observe, { value, onChange, playerInputs }) => {
  return (
    <Tabs
      type='editable-card'
      items={[...value].map(([id, preset]) => ({
        key: id,
        label: (
          <TabLabel
            name={preset.name}
            onChange={newName => {
              onChange(new Map([
                ...value,
                [id, {
                  ...preset,
                  name: newName
                }]
              ]))
            }}
          />
        ),
        children: (
          <TabContent
            playerInputs={playerInputs}
            value={preset}
            onChange={newValue => {
              onChange(new Map([
                ...value,
                [id, newValue]
              ]))
            }}
          />
        )
      }))}
      onEdit={(targetKey, action) => {
        if (action === 'add') {
          onChange(new Map([
            ...value,
            [uuid4(), {
              name: 'New Preset',
              playerInputPresetType: PlayerIosPresetType.KEYBOARD_AND_MOUSE,
              inputs: playerInputs.map(() => [])
            }]
          ]))
        } else {
          onChange(readOnlyMapRemove({ map: value, key: targetKey as string }))
        }
      }}
    />
  )
})

export default PlayerInputsPresets
