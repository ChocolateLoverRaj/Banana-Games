import { FC, ReactNode } from 'react'
import { Tabs, Button } from 'antd'
import { ControlOutlined } from '@ant-design/icons'
import { paused as pausedStyle, pausedContent } from './GameWithActions.module.scss'
import {
  ActionInputs,
  ActionKeysConfig,
  useOnAction
} from '../../util/action-inputs'
import PausedMenu from '../../PausedMenu'
import TouchInputs from '../../util/action-inputs/TouchInputs'
import TouchButtonsConfig from '../../util/action-inputs/TouchButtonsConfig'
import { detectTouch } from 'detect-touch'
import TouchButtons from '../action-inputs/TouchButtons'
import Size from '../types/Size'
import bind from 'bind-args'
import { Screen, UseScreenResult } from './useScreen'

export interface GameWithActionsProps<Action extends string = string> {
  actionInputs: ActionInputs<Action>
  touchButtons: TouchButtons<Action>
  back: Action
  children: ReactNode
  size: Size
  useScreenResult: UseScreenResult
}

const GameWithActions: FC<GameWithActionsProps> = <Action extends string = string>(
  props: GameWithActionsProps<Action>
) => {
  const { actionInputs, back, children, size, touchButtons, useScreenResult } = props

  const [screen, setScreen] = useScreenResult
  useOnAction(actionInputs, touchButtons, back, setScreen.bind(undefined, Screen.PAUSED))

  return (
    <>
      <div>
        {children}
      </div>
      {(detectTouch()) && (screen === Screen.TOUCH_EDIT
        ? <TouchButtonsConfig
            {...{ actionInputs }}
            onExit={setScreen.bind(undefined, Screen.PAUSED)}
            boundary={size}
          />
        : <TouchInputs touchButtons={touchButtons} />)}
      {screen === Screen.PAUSED && (
        <div className={pausedStyle}>
          <div className={pausedContent}>
            <PausedMenu
              onClose={bind(setScreen, Screen.PLAYING)}
              actionInputs={actionInputs}
              action={back}
            >
              {[{
                title: 'Controls',
                content: (
                  <Tabs>
                    <Tabs.TabPane key='keyboard' tab='Keyboard'>
                      <ActionKeysConfig {...{ actionInputs }} />
                    </Tabs.TabPane>
                    <Tabs.TabPane key='touch' tab='Touch' disabled={!(detectTouch())}>
                      <Button onClick={setScreen.bind(undefined, Screen.TOUCH_EDIT)}>
                        Edit Buttons
                      </Button>
                    </Tabs.TabPane>
                  </Tabs>
                ),
                icon: <ControlOutlined />
              }]}
            </PausedMenu>
          </div>
        </div>
      )}
    </>
  )
}

export default GameWithActions
