import GameComponent from '../../types/GameComponent'
import { GameWithActions, useScreen } from '../../util/gameWithSettings'
import { observer } from 'mobx-react-lite'
import { usePressEmitter } from '../../util/booleanGameSettings'
import pauseSettingData from '../../pauseSettingData'
import pauseContext from './pauseContext'
import settings from './settings'
import { switchCase } from '../../util/mobxObservablePromise'
import getMediaStream from '../../util/cameraGameSetting/getMediaStream'
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
      <GameRefContext.Provider value={{ gameRef: ref, screen }}>
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
