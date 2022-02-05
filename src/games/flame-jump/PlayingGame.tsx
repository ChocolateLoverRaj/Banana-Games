import GameComponent from '../../types/GameComponent'
import { GameWithActions, useScreen } from '../../util/game-with-settings'
import { observer } from 'mobx-react-lite'
import { usePressEmitter } from '../../util/boolean-game-settings'
import pauseSettingData from '../../pauseSettingData'
import pauseContext from './pauseContext'
import settings from './settings'
import { switchCase } from '../../util/mobx-observable-promise'
import getMediaStream from '../../util/camera-game-setting/getMediaStream'
import cameraSetting from './cameraSetting'
import VideoStarter from './VideoStarter'
import { ReactNode } from 'react'
import GameRefContext from './GameContext'

const aspectRatio = { width: 16, height: 9 }

const PlayingGame: GameComponent = observer((_props, ref) => {
  const pauseEmitter = usePressEmitter({ data: pauseSettingData, context: pauseContext })
  const screen = useScreen(pauseEmitter)

  return (
    <GameWithActions
      {...{ aspectRatio, ref, settings, pauseEmitter, screen }}
    >
      <GameRefContext.Provider value={{ gameRef: ref as any, screen }}>
        {switchCase<MediaStream, ReactNode>(
          getMediaStream(cameraSetting),
          mediaStream => <VideoStarter mediaStream={mediaStream} />,
          () => 'Starting Camera',
          () => 'Error starting camera - make sure it is not being used by another app')}
      </GameRefContext.Provider>
    </GameWithActions>
  )
}, { forwardRef: true })

export default PlayingGame
