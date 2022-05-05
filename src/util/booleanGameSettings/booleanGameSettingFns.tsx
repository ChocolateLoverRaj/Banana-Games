import { GameSettingFns } from '../gameSetting'
import Data from './Data'
import setSet from '../setSet'
import clone from 'rfdc/default'
import { action } from 'mobx'
import TouchButton from './TouchButton'
import Context from './Context'
import { emit } from 'emitter2'
import Edit from './Edit'

const booleanGameSettingFns: GameSettingFns<Data, Context> = {
  getName: ({ data: { name } }) => name,
  screenRects: {
    getSet: {
      get: ({ data: { screenRects } }) => screenRects,
      set: ({ data }, screenRects) => {
        data.screenRects = screenRects
      }
    },
    render: ({ data, context }, {
      screenRect,
      isPlaying,
      htmlProps,
      style,
      touchScreen
    }) => touchScreen && (
      <TouchButton
        absolutePosition={screenRect}
        buttonProps={{
          ...htmlProps as any,
          ...isPlaying
            ? {
              onTouchStart: action(() => {
                emit(context, true)
              }),
              onTouchEnd: action(() => {
                emit(context, false)
              })
            }
            : undefined
        }}
        {...{ style }}
      >
        {data.buttonContent}
      </TouchButton>
    )
  },
  reset: {
    isSameAsDefault: ({ data: { keyBindings, defaultKeyBindings } }) => {
      return [...keyBindings].join() === [...defaultKeyBindings].join()
    },
    resetToDefault: ({ data }) => {
      const { defaultKeyBindings, keyBindings, defaultButtons } = data
      setSet(keyBindings, defaultKeyBindings)
      data.screenRects = clone(defaultButtons)
    }
  },
  renderEdit: commonParam => <Edit {...{ commonParam }} />
}

export default booleanGameSettingFns
