import Screen from './Screen'
import { useEmitHandler, emit, Data as Emitter } from 'emitter2'
import { useState } from 'react'
import ScreenEmitter from './ScreenEmitter'
import { Data as MobxEmitterData, initialize } from '../mobxEmitterValue'
import ScreenEnum from './ScreenEnum'

const useScreen = (pauseEmitter: Emitter<[]>): Screen => {
  const [screen] = useState(() => {
    const screenEmitter: ScreenEmitter = new Set()
    const screenMobx: MobxEmitterData<[ScreenEnum]> =
      initialize(screenEmitter, [ScreenEnum.PLAYING], 'Screen Emitter')
    const screen: Screen = {
      emitter: screenEmitter,
      mobx: screenMobx
    }
    return screen
  })
  useEmitHandler(pauseEmitter, () => emit(screen.emitter, ScreenEnum.PAUSED))
  return screen
}

export default useScreen
