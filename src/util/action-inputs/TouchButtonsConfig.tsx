import { FC, MouseEventHandler } from 'react'
import ActionInputs from './ActionInputs'
import { DragOutlined, StopOutlined, CheckOutlined } from '@ant-design/icons'
import { Space, Divider } from 'antd'
import Draggable from 'react-draggable'
import AbsolutePosition from './types/AbsolutePosition'
import TouchButtonEdit from './TouchButtonEdit'
import Size from '../types/Size'
import { css } from '@emotion/css'
import { useLocalObservable } from 'mobx-react-lite'

export type OnExit = () => void
export interface TouchButtonsConfigProps<Action extends string = string> {
  actionInputs: ActionInputs<Action>
  onExit: OnExit
  boundary: Size
}

const dragHandle = css({ cursor: 'move ' })

const TouchButtonsConfig: FC<TouchButtonsConfigProps> = <Action extends string = string>(
  props: TouchButtonsConfigProps<Action>
) => {
  const { actionInputs, onExit, boundary } = props

  const newButtons = useLocalObservable(() => new Map([...actionInputs.currentInputs].flatMap(
    ([,{ touch: { buttons } }]) => [...buttons])
    .map<[AbsolutePosition & Size, AbsolutePosition & Size]>(position => [position, position])))

  const handleDone: MouseEventHandler = () => {
    onExit()
    actionInputs.currentInputs.forEach(input => {
      input.touch.buttons = new Set([...input.touch.buttons].map(absolutePosition =>
        newButtons.get(absolutePosition) as AbsolutePosition & Size))
    })
  }

  return (
    <>
      {[...actionInputs.currentInputs].map(([action, { touch: { buttonContents, buttons } }]) => [...buttons].map(
        absolutePosition => {
          const { x, y } = absolutePosition
          return (
            <TouchButtonEdit
              key={`${x.value} ${Number(x.reverse)} ${y.value} ${Number(y.reverse)}`}
              absolutePosition={newButtons.get(absolutePosition) as AbsolutePosition & Size}
              boundary={boundary}
            >
              {buttonContents}
            </TouchButtonEdit>
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
}

export default TouchButtonsConfig
