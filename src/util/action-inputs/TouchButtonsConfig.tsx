import { FC, MouseEventHandler, useState, useRef, Dispatch } from 'react'
import ActionInputs from './ActionInputs'
import useCurrentInputs from './useCurrentInputs'
import { menu, dragHandle } from './TouchButtonsConfig.module.scss'
import { DragOutlined, StopOutlined, CheckOutlined } from '@ant-design/icons'
import { Space, Divider } from 'antd'
import Draggable from 'react-draggable'
import { Map } from 'immutable'
import AbsolutePosition from './types/AbsolutePosition'
import TouchButtonEdit from './TouchButtonEdit'
import Size from '../types/Size'

export type OnExit = () => void
export interface TouchButtonsConfigProps<Action extends string = string> {
  actionInputs: ActionInputs<Action>
  onExit: OnExit
  boundary: Size
}

const TouchButtonsConfig: FC<TouchButtonsConfigProps> = <Action extends string = string>(
  props: TouchButtonsConfigProps<Action>
) => {
  const { actionInputs, onExit, boundary } = props

  const setCurrentInputs = useCurrentInputs(actionInputs)[1]
  const currentInputs = useRef(actionInputs.currentInputs).current
  const [newButtons, setNewButtons] = useState(Map([...currentInputs].flatMap(
    ([,{ touch: { buttons } }]) => [...buttons])
    .map<[AbsolutePosition & Size, AbsolutePosition & Size]>(position => [position, position])))

  const handleDone: MouseEventHandler = () => {
    onExit()
    setCurrentInputs(currentInputs.map(input => ({
      ...input,
      touch: {
        ...input.touch,
        buttons: input.touch.buttons.map(absolutePosition =>
          newButtons.get(absolutePosition) as AbsolutePosition & Size)
      }
    })))
  }

  return (
    <>
      {[...currentInputs].map(([action, { touch: { buttonContents, buttons } }]) => buttons.map(
        absolutePosition => {
          const { x, y } = absolutePosition
          const handleAbsolutePositionChange: Dispatch<AbsolutePosition> = newPosition =>
            setNewButtons(newButtons.set(absolutePosition, { ...absolutePosition, ...newPosition }))
          return (
            <TouchButtonEdit
              key={`${x.value} ${Number(x.reverse)} ${y.value} ${Number(y.reverse)}`}
              absolutePosition={newButtons.get(absolutePosition) as AbsolutePosition & Size}
              onAbsolutePositionChange={handleAbsolutePositionChange}
              boundary={boundary}
            >
              {buttonContents}
            </TouchButtonEdit>
          )
        }))}
      <Draggable bounds='parent' handle={`.${dragHandle}`}>
        <Space className={menu}>
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
