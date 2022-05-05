import { Data } from 'emitter2'
import { SettingWithContext } from './useSettingsWithContext'
import never from 'never'
import { usePressEmitter } from './booleanGameSettings'

const usePauseEmitter = (
  settingsWithContext: Map<string, SettingWithContext>,
  pauseKey: string
): Data<[]> => {
  const pauseSettingWithContext = settingsWithContext.get(pauseKey) ?? never()
  const pauseEmitter = usePressEmitter({
    context: pauseSettingWithContext.context,
    data: pauseSettingWithContext.defaultData
  })
  return pauseEmitter
}

export default usePauseEmitter
