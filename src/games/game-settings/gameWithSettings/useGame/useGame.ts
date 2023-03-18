import 'react-edit-text/dist/index.css'
import useConstant from 'use-constant'
import createGameSettingsSyncAsync from '../createGameSettingsSyncAsync/createGameSettingsSyncAsync'
import Input from './Input'
import Output from './Output'

const useGame = (input: Input): Output => {
  const { defaultPlayerInputsPresets, defaultSettingsPresets, id, upgrade, version } = input
  const syncAsync = useConstant(() => createGameSettingsSyncAsync({
    defaultPlayerInputsPresets,
    defaultSettingsPresets,
    id,
    upgrade,
    version
  }))

  return {
    input,
    syncAsync
  }
}

export default useGame
