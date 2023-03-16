import { Tabs } from 'antd'
import reactObserver from 'observables/lib/reactObserver/reactObserver'
import Props from './Props'
import TabLabel from './tabLabel/TabLabel'

const PlayerInputsPresets = reactObserver<Props>((observe, { value, onChange }) => {
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
        children: 'Content'
      }))}
      onEdit={(targetKey, action) => {
        if (action === 'add') {
          onChange([
            ...value,
            {
              name: 'New Preset'
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
