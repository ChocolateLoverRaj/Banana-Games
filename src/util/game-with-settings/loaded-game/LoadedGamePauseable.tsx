import { useEffect, Fragment } from 'react'
import { Tabs, Button } from 'antd'
import { ControlOutlined, SettingOutlined, GatewayOutlined } from '@ant-design/icons'
import { EditGameSettings } from '../../game-with-settings'
import PausedMenu from '../../../PausedMenu'
import SettingsRectsEdit from '../SettingRectsEdit'
import useVisible from '../../useVisible'
import { css } from '@emotion/css'
import PausedContainer from '../PausedContainer'
import { observer } from 'mobx-react-lite'
import CommonParam from '../../game-setting/CommonParam'
import { Context, Data } from '../../boolean-game-settings'
import { get } from '../../mobx-emitter-value'
import ScreenEnum from '../ScreenEnum'
import { emit } from 'emitter2'
import LoadedGamePauseableProps from './LoadedGamePauseableProps'

const LoadedGamePauseable = observer<LoadedGamePauseableProps>(({
  children,
  size,
  allGameSettings,
  screen,
  settings,
  containerRef
}) => {
  const { pausedWhenNotVisible, touchScreen } = allGameSettings

  const visible = useVisible()
  const [currentScreen] = get(screen.mobx)

  useEffect(() => {
    if (!visible && pausedWhenNotVisible && currentScreen === ScreenEnum.PLAYING) {
      emit(screen.emitter, ScreenEnum.PAUSED)
    }
  }, [pausedWhenNotVisible, visible, currentScreen])

  return (
    <>
      {children}
      {currentScreen === ScreenEnum.SCREEN_EDIT
        ? (
          <SettingsRectsEdit
            {...{ settings, containerRef, allGameSettings }}
            onExit={() => emit(screen.emitter, ScreenEnum.PAUSED)}
            boundary={size}
          />)
        : settings.map(({ fns, data, context }) => {
          const param: CommonParam<Data, Context> = { data, context }
          return (
            <Fragment key={fns.getName(param)}>
              {fns.screenRects?.getSet.get(param).map(screenRect => {
                return (
                  <Fragment
                    key={JSON.stringify(screenRect)}
                  >
                    {fns.screenRects?.render(param, {
                      screenRect,
                      container: containerRef.current as any,
                      isPlaying: currentScreen === ScreenEnum.PLAYING,
                      touchScreen
                    })}
                  </Fragment>
                )
              })}
            </Fragment>
          )
        })}
      {currentScreen === ScreenEnum.PAUSED && (
        <PausedContainer>
          <div
            className={css({
              maxHeight: '100%',
              overflow: 'auto'
            })}
          >
            <PausedMenu
              onClose={() => emit(screen.emitter, ScreenEnum.PLAYING)}
              screenEmitter={screen.emitter}
            >
              {[{
                title: 'Settings',
                content: (
                  <Tabs>
                    <Tabs.TabPane key='controls' tab={<><ControlOutlined />Controls</>}>
                      <EditGameSettings {...{ settings }} />
                    </Tabs.TabPane>
                    <Tabs.TabPane key='configure screen' tab={<><GatewayOutlined />Configure Screen</>}>
                      <Button onClick={() => emit(screen.emitter, ScreenEnum.SCREEN_EDIT)}>
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
})

export default LoadedGamePauseable
