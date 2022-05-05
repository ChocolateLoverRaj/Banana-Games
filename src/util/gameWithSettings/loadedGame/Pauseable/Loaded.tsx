import { useEffect, Fragment, ReactElement } from 'react'
import { Tabs, Button } from 'antd'
import { ControlOutlined, SettingOutlined, GatewayOutlined } from '@ant-design/icons'
import { EditGameSettings } from '../../EditGameSettings'
import PausedMenu from '../../../../PausedMenu'
import SettingsRectsEdit from '../../SettingRectsEdit'
import useVisible from '../../../useVisible'
import { css } from '@emotion/css'
import PausedContainer from '../../PausedContainer'
import { observer } from 'mobx-react-lite'
import ScreenEnum from '../../ScreenEnum'
import { Data as Emitter } from 'emitter2'
import { useEmitters } from '../../..'
import { set } from '../../../ObservableValue'
import PromiseState from '../../../../types/PromiseState'
import LoadedProps from './LoadedProps'

const Loaded = observer<LoadedProps>(({
  children,
  size,
  allGameSettings,
  game,
  containerRef,
  pauseEmitter
}) => {
  const { pausedWhenNotVisible, touchScreen } = allGameSettings

  const visible = useVisible()
  const emitters: Array<Emitter<[]>> = []
  const { value: currentScreen, emitter } = game.screen
  emitters.push(emitter)

  useEffect(() => {
    if (!visible && pausedWhenNotVisible && currentScreen === ScreenEnum.PLAYING) {
      set(game.screen, ScreenEnum.PAUSED)
    }
  }, [pausedWhenNotVisible, visible, currentScreen])

  const settingsArr = [...game.gameSettingsLoadable]

  const reactElement: ReactElement = (
    <>
      {children}
      {currentScreen === ScreenEnum.SCREEN_EDIT
        ? (
          <SettingsRectsEdit
            {...{ containerRef, allGameSettings }}
            onExit={() => set(game.screen, ScreenEnum.PAUSED)}
            boundary={size}
            settings={game.gameSettingsLoadable}
          />)
        : settingsArr.map(([
          { fns: { coreFns: { getName, screenRects } } },
          { loadedValue: { emitter, value: observablePromise } }
        ]) => {
          emitters.push(emitter)
          if (observablePromise === undefined) return undefined
          emitters.push(observablePromise.emitter)
          if (observablePromise.state !== PromiseState.RESOLVED) return undefined
          const param = observablePromise.result
          return observablePromise.state === PromiseState.RESOLVED && (
            <Fragment key={getName(param)}>
              {screenRects?.getSet.get(param).map(screenRect => {
                return (
                  <Fragment
                    key={JSON.stringify(screenRect)}
                  >
                    {screenRects?.render(param, {
                      screenRect,
                      container: containerRef.current as any,
                      isPlaying: currentScreen === ScreenEnum.PLAYING,
                      touchScreen
                    })}
                  </Fragment>
                )
              })}
            </Fragment>)
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
              onClose={() => set(game.screen, ScreenEnum.PLAYING)}
              pauseEmitter={pauseEmitter}
            >
              {[{
                title: 'Settings',
                content: (
                  <Tabs>
                    <Tabs.TabPane key='controls' tab={<><ControlOutlined />Controls</>}>
                      <EditGameSettings game={game} />
                    </Tabs.TabPane>
                    <Tabs.TabPane
                      key='configure screen'
                      tab={<><GatewayOutlined />Configure Screen</>}
                    >
                      <Button onClick={() => set(game.screen, ScreenEnum.SCREEN_EDIT)}>
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

  useEmitters(emitters)

  return reactElement
})

export default Loaded
