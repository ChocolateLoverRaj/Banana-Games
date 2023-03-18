import { Tabs } from 'antd'
import reactObserver from 'observables/lib/reactObserver/reactObserver'
import PlayerIosPresetType from '../../PlayerIosPresetType'
import Props from './Props'
import TabContent from './tabContent/TabContent'
import TabLabel from './tabLabel/TabLabel'

const PlayerInputsPresets = reactObserver<Props>((observe, { value, onChange, playerInputs }) => {
  return (
    <Tabs
      type='editable-card'
      items={value.map((preset, index) => ({
        key: index.toString(),
        label: (
          <TabLabel
            name={preset.name}
            onChange={newName => {
              onChange([
                ...value.slice(0, index),
                {
                  ...preset,
                  name: newName
                },
                ...value.slice(index + 1)
              ])
            }}
          />
        ),
        children: (
          <TabContent
            playerInputs={playerInputs}
            value={preset}
            onChange={newValue => {
              onChange([
                ...value.slice(0, index),
                newValue,
                ...value.slice(index + 1)
              ])
            }}
          />
        )
      }))}
      onEdit={(targetKey, action) => {
        if (action === 'add') {
          onChange([
            ...value,
            {
              name: 'New Preset',
              playerInputPresetType: PlayerIosPresetType.KEYBOARD_AND_MOUSE,
              inputs: playerInputs.map(() => [])
            }
          ])
        } else {
          const index = parseInt(targetKey as string)
          onChange([
            ...value.slice(0, index),
            ...value.slice(index + 1)
          ])
        }
      }}
    />
  )
})

export default PlayerInputsPresets
