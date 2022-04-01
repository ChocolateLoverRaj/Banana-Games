import { Context, createContext } from 'react'
import { SettingWithContext } from '../../util/useSettingsWithContext'

const GameContext: Context<Map<string, SettingWithContext>> = (createContext as Function)()

export default GameContext
