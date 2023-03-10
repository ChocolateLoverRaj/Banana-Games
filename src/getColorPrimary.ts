import localStorage from 'mobx-localstorage'
import colorPrimaryKey from './colorPrimaryKey'

const getColorPrimary = (): string => localStorage.getItem(colorPrimaryKey) ?? 'ffff00'

export default getColorPrimary
