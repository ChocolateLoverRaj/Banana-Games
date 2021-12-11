import { FC, MouseEventHandler } from 'react'
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
import { ObservableMap } from 'mobx'

export type OnExit = () => void
export interface SettingRectsEdit {
  settings: GameSetting[]
  onExit: OnExit
  boundary: Size
}

const dragHandle = css({ cursor: 'move ' })

const SettingsRectsEdit: FC<SettingRectsEdit> = observer(({ settings, onExit, boundary }) => {
  const newScreenRects = useLocalObservable(() => new ObservableMap(settings.flatMap(setting => setting.screenRects.map(screenRect => [screenRect, clone(screenRect)]))))

  const handleDone: MouseEventHandler = () => {
    onExit()
    settings.forEach(setting => {
      setting.screenRects = setting.screenRects.map(screenRect => newScreenRects.get(screenRect))
    })
  }

  return (
    <>
      {settings.map(setting => setting.screenRects.map(
        screenRect => {
          const newScreenRect = newScreenRects.get(screenRect) as AbsolutePosition & Size
          return (
            <MoveSettingRect
              key={JSON.stringify(screenRect)}
              screenRect={newScreenRect}
              boundary={boundary}
              {...{ setting }}
            />
          )
        }))}
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
