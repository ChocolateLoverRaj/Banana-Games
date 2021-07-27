import { FC, useEffect } from 'react'
import { Tabs, Button } from 'antd'
import { ControlOutlined } from '@ant-design/icons'
import { paused as pausedStyle, pausedContent } from './GameWithActions.module.scss'
import {
  ActionKeysConfig,
  useOnAction
} from '../action-inputs'
import PausedMenu from '../../PausedMenu'
import TouchInputs from '../action-inputs/TouchInputs'
import TouchButtonsConfig from '../action-inputs/TouchButtonsConfig'
import { detectTouch } from 'detect-touch'
import bind from 'bind-args'
import { Screen } from './useScreen'
import { GameWithActionsProps } from './GameWithActions'
import useVisible from '../useVisible'

export interface LoadedGameProps<Action extends string = string> extends
  GameWithActionsProps<Action> {
  pausedWhenNotVisible: boolean
}

const LoadedGame: FC<LoadedGameProps> = <Action extends string = string>(
  props: LoadedGameProps<Action>
) => {
  const {
    actionInputs,
    back,
    children,
    size,
    touchButtons,
    useScreenResult,
    pausedWhenNotVisible
  } = props

  const [screen, setScreen] = useScreenResult
  useOnAction(actionInputs, touchButtons, back, setScreen.bind(undefined, Screen.PAUSED))
  const visible = useVisible()

  useEffect(() => {
    if (!visible && pausedWhenNotVisible && screen === Screen.PLAYING) setScreen(Screen.PAUSED)
  }, [pausedWhenNotVisible, visible])

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

export default LoadedGame
