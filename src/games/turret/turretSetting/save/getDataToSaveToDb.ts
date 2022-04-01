import SettingData from '../Data'
import pick from 'object.pick'
import { toJS } from 'mobx'

/**
 * @param setting Turret setting
 * @returns A plain value which can be put into IndexedDB
 */
const getDataToSaveToDb = (setting: SettingData): any =>
  pick(toJS(setting), ['controlType', 'screenRects'])

export default getDataToSaveToDb
