import { GameSetting } from './gameSetting'
import { SettingWithContext } from './useSettingsWithContext'

/**
 * @param settingsWithContext A map of settings with context
 * @returns An array of game settings for `GameWithActions`
 */
const getSettingsForGame = (
  settingsWithContext: Map<string, SettingWithContext>
): ReadonlyArray<GameSetting<any, any>> =>
  [...settingsWithContext.values()].map(({ context, data, fns }) =>
    ({ context, data, fns: fns.coreFns }))

export default getSettingsForGame
