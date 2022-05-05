import { GameSettingDataAndAllFns } from '../gameSetting'
import { useState } from 'react'
import { mapMapValues } from '../mapMapValues'
import SettingWithContext from './SettingWithContext'

/**
 * - Initializes a context for each setting
 * - Returned map is consistent on every render
 * @param settings Map of id and setting data with functions
 * @returns A map which includes everything in the original map plus `data` property in each value.
 */
const useSettingsWithContext = (
  settings: Map<string, GameSettingDataAndAllFns>
): Map<string, SettingWithContext> => {
  const [settingsWithContext] = useState(() =>
    mapMapValues(settings, ({ defaultData: data, fns }) => ({ context: fns.initializeContext(), data, fns })))
  return settingsWithContext
}

export default useSettingsWithContext
