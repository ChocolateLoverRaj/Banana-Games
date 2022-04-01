import GameComponent from '../../types/GameComponent'
import { observer } from 'mobx-react-lite'
import { GameWithActions, useScreen } from '../../util/gameWithSettings'
import settings from './settings'
import { css } from '@emotion/css'
import centerStyles from '../../centerStyles'
import useComponentSize from '@rehooks/component-size'
import getScaledSize from '../../util/getScaledSize'
import farContainerStyles from '../../farContainerStyles'
import farStyles from '../../farStyles'
import Canvas from './Canvas'
import { useSettingsWithContext } from '../../util/useSettingsWithContext'
import usePauseEmitter from '../../util/usePauseEmitter'
import getSettingsForGame from '../../util/getSettingForGame'
import GameContext from './GameContext'
import { LoadSettings } from '../../util/loadSettings'
import useSavableGameSettings from '../../util/useSavableGameSettings'

export const Game: GameComponent = observer((_props, ref) => {
  const size = useComponentSize(ref as any)
  const scaledSize = getScaledSize(size, { width: 1, height: 1 })

  const settingsWithContext = useSettingsWithContext(settings)
  const pauseEmitter = usePauseEmitter(settingsWithContext, 'pause')
  const screen = useScreen(pauseEmitter)

  const savableGameSettings = useSavableGameSettings(settings, 'turret')

  return (
    <GameContext.Provider value={settingsWithContext}>
      <GameWithActions
        {...{ ref, screen }}
        className={css(centerStyles, farContainerStyles)}
        settings={getSettingsForGame(settingsWithContext)}
      >
        <LoadSettings settings={savableGameSettings}>
          <div
            className={css(farStyles)}
            style={scaledSize}
          >
            <Canvas size={scaledSize.width} screen={screen} />
          </div>
        </LoadSettings>
      </GameWithActions>
    </GameContext.Provider>
  )
}, { forwardRef: true })

export const description = (
  <>
    This game is a mini demo of an upcoming 2D tank game. In this game, you control the turret.
  </>
)
