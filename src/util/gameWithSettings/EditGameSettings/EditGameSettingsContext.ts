import { createContext, Context } from 'react'
import EditGameSettingsContextData from './EditGameSettingsContextData'

const EditGameSettingsContext =
  (createContext as Function)() as Context<EditGameSettingsContextData>

export default EditGameSettingsContext
