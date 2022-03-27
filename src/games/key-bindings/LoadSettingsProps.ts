import { Data as BooleanGameSettingData } from '../../util/booleanGameSettings'
import { PropsWithChildren } from 'react'

type LoadSettingsProps = PropsWithChildren<{
  settings: readonly BooleanGameSettingData[]
  idPrefix: string
}>

export default LoadSettingsProps
