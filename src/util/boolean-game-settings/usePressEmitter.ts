import { BooleanGameSetting } from '.'
import { Data, emit } from '../emitter'
import { useLocalObservable } from 'mobx-react-lite'
import { useState, useEffect } from 'react'
import { autorun, runInAction, observable } from 'mobx'
import MobxInputPressed from './MobxInputPressed'

const usePressEmitter = (setting: BooleanGameSetting): Data<[]> => {
  const [pauseEmitter] = useState<Data<[]>>(new Set())
  const inputPressed = useLocalObservable(() => new MobxInputPressed(setting))
  const wasPreviouslyPressed = useLocalObservable(() => observable.box(false))

  useEffect(() => autorun(() => {
    const isPressed = inputPressed.pressed
    if (!wasPreviouslyPressed.get() && isPressed) emit(pauseEmitter)
    runInAction(() => {
      wasPreviouslyPressed.set(isPressed)
    })
  }))

  return pauseEmitter
}

export default usePressEmitter
