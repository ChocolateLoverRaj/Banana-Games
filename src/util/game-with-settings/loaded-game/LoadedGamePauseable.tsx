import { FC, useEffect, Fragment } from 'react'
import { Tabs, Button } from 'antd'
import { ControlOutlined, SettingOutlined, GatewayOutlined } from '@ant-design/icons'
import { EditGameSettings } from '../../game-with-settings'
import PausedMenu from '../../../PausedMenu'
import SettingsRectsEdit from '../SettingRectsEdit'
import bind from 'bind-args'
import useScreen, { Screen } from '../useScreen'
import useVisible from '../../useVisible'
import { LoadedGameProps } from './LoadedGame'
import { css } from '@emotion/css'
import PausedContainer from '../PausedContainer'
import PauseEmitter from '../../PauseEmitter'
import { useEmitHandler } from '../../emitter'

export interface LoadedGamePauseableProps extends LoadedGameProps {
  pauseEmitter: PauseEmitter
}

const LoadedGamePauseable: FC<LoadedGamePauseableProps> = ({
  children,
  size,
  gameSettings,
  useScreenResult,
  settings,
  pauseEmitter
}) => {
  const { pausedWhenNotVisible } = gameSettings

  const [screen, setScreen] = useScreenResult ?? useScreen()
  useEmitHandler(pauseEmitter, setScreen.bind(undefined, Screen.PAUSED))
  const visible = useVisible()

  useEffect(() => {
    if (!visible && pausedWhenNotVisible && screen === Screen.PLAYING) setScreen(Screen.PAUSED)
  }, [pausedWhenNotVisible, visible])

  return (
    <>
      {children}
      {screen === Screen.SCREEN_EDIT
        ? (
          <SettingsRectsEdit
            {...{ settings }}
            onExit={setScreen.bind(undefined, Screen.PAUSED)}
            boundary={size}
          />)
        : settings.map(setting =>
          <Fragment key={setting.displayName}>
            {setting.screenRects.map(screenRect => (
              <Fragment
                key={JSON.stringify(screenRect)}
              >
                {setting.renderScreenRect(screenRect, true)}
              </Fragment>
            ))}
          </Fragment>)}
      {screen === Screen.PAUSED && (
        <PausedContainer>
          <div
            className={css({
              maxHeight: '100%',
              overflow: 'auto'
            })}
          >
            <PausedMenu
              onClose={bind(setScreen, Screen.PLAYING)}
              {...{ pauseEmitter }}
            >
              {[{
                title: 'Settings',
                content: (
                  <Tabs>
                    <Tabs.TabPane key='controls' tab={<><ControlOutlined />Controls</>}>
                      <EditGameSettings {...{ settings }} />
                    </Tabs.TabPane>
                    <Tabs.TabPane key='configure screen' tab={<><GatewayOutlined />Configure Screen</>}>
                      <Button onClick={setScreen.bind(undefined, Screen.SCREEN_EDIT)}>
                        Edit Buttons
                      </Button>
                    </Tabs.TabPane>
                  </Tabs>
                ),
                icon: <SettingOutlined />
              }]}
            </PausedMenu>
          </div>
        </PausedContainer>
      )}
    </>
  )
}

export default LoadedGamePauseable
