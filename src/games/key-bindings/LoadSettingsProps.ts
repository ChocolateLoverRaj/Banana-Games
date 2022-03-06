import { Data as BooleanGameSettingData } from '../../util/boolean-game-settings'
import { PropsWithChildren } from 'react'

type LoadSettingsProps = PropsWithChildren<{
  settings: readonly BooleanGameSettingData[]
  idPrefix: string
}>

export default LoadSettingsProps
