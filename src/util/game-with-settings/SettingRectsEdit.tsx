import { FC, MouseEventHandler, RefObject } from 'react'
import { DragOutlined, StopOutlined, CheckOutlined } from '@ant-design/icons'
import { Space, Divider } from 'antd'
import Draggable from 'react-draggable'
import AbsolutePosition from '../types/AbsolutePosition'
import MoveSettingRect from './MoveSettingRect'
import Size from '../types/Size'
import { css } from '@emotion/css'
import { useLocalObservable, observer } from 'mobx-react-lite'
import { GameSetting } from '../game-setting'
import clone from 'rfdc/default'
import { ObservableMap, action } from 'mobx'
import CommonParam from '../game-setting/CommonParam'
import { Context, Data } from '../boolean-game-settings'

export type OnExit = () => void
export interface SettingRectsEdit {
  settings: ReadonlyArray<GameSetting<any, any>>
  onExit: OnExit
  boundary: Size
  containerRef: RefObject<HTMLDivElement>
}

const dragHandle = css({ cursor: 'move ' })

const SettingsRectsEdit: FC<SettingRectsEdit> = observer(({
  settings,
  onExit,
  boundary,
  containerRef
}) => {
  const newScreenRects = useLocalObservable(() => new ObservableMap(settings.flatMap(({ fns, data, context }) =>
    fns.screenRects?.getSet.get({ data, context }).map(screenRect => [screenRect, clone(screenRect)]))))

  const handleDone = action<MouseEventHandler>(() => {
    onExit()
    settings.forEach(({ fns, data, context }) => {
      const param: CommonParam<Data, Context> = { data, context }
      fns.screenRects?.getSet.set(param, fns.screenRects?.getSet.get(param).map(screenRect => newScreenRects.get(screenRect)))
    })
  })

  return (
    <>
      {settings.map(setting => {
        const { fns, data, context } = setting
        return fns.screenRects?.getSet.get({ data, context }).map(
          screenRect => {
            const newScreenRect = newScreenRects.get(screenRect) as AbsolutePosition & Size
            return (
              <MoveSettingRect
                key={JSON.stringify(screenRect)}
                screenRect={newScreenRect}
                boundary={boundary}
                {...{ setting, containerRef }}
              />
            )
          })
      })}
      <Draggable bounds='parent' handle={`.${dragHandle}`}>
        <Space
          className={css`
          border: 1px solid black;
          padding: 1%;
        `}
        >
          <DragOutlined className={dragHandle} />
          <Divider type='vertical' />
          <StopOutlined onClick={onExit} />
          <CheckOutlined onClick={handleDone} />
        </Space>
      </Draggable>
    </>
  )
})

export default SettingsRectsEdit
