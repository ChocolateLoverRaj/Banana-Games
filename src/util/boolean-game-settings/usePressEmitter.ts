import { BooleanGameSetting } from '.'
import { Emitter } from '../emitter'
import { useLocalObservable } from 'mobx-react-lite'
import { useState, useEffect } from 'react'
import { autorun, runInAction, observable } from 'mobx'
import MobxInputPressed from './MobxInputPressed'

const usePressEmitter = (setting: BooleanGameSetting): Emitter<[]> => {
  const [pauseEmitter] = useState(new Emitter<[]>())
  const inputPressed = useLocalObservable(() => new MobxInputPressed(setting))
  const wasPreviouslyPressed = useLocalObservable(() => observable.box(false))

  useEffect(() => autorun(() => {
    const isPressed = inputPressed.pressed
    if (!wasPreviouslyPressed.get() && isPressed) pauseEmitter.emit()
    runInAction(() => {
      wasPreviouslyPressed.set(isPressed)
    })
  }))

  return pauseEmitter
}

export default usePressEmitter
