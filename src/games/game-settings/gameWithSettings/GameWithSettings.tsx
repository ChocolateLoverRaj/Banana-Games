import { forwardRef } from 'react'
import Props from './Props'
import { Tabs } from 'antd'
import { EditText } from 'react-edit-text'
import 'react-edit-text/dist/index.css'

const GameWithSettings = forwardRef<HTMLDivElement, Props>(({ settings }, ref) => {
  return (
    // TODO: Save and load presets to indexed db
    <div ref={ref}>
      <h1>Edit Presets</h1>
      <Tabs
        type='editable-card'
        onEdit={(e, action) => {
          console.log(e, action)
        }}
      >
        {defaultPresets.map(({ name }, index) => {
          return (
            <Tabs.TabPane
              // TODO: Use Antd components - https://github.com/bymi15/react-edit-text/issues/46
              // FIXME: Pressing space doesn't work -
              // https://github.com/bymi15/react-edit-text/issues/47
              tab={
                <EditText
                  value={name}
                  onChange={({ target: { value } }) =>
                    console.log(value)}
                  onKeyDown={e => e.stopPropagation()}
                />
              }
              key={index}
            >
              <h2>Settings</h2>
              Settings will go here
            </Tabs.TabPane>
          )
        })}
      </Tabs>
    </div>
  )
})

export default GameWithSettings
