import { PropsWithChildren } from 'react'
import { SavableGameSetting } from '.'

type LoadSettingsProps = PropsWithChildren<{
  settings: ReadonlyArray<SavableGameSetting<any, any>>
}>

export default LoadSettingsProps
