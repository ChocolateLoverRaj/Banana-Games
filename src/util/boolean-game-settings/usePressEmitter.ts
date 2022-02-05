import { Data, Context } from '.'
import { Data as EmitterData, emit } from 'emitter2'
import { useLocalObservable } from 'mobx-react-lite'
import { useState, useEffect } from 'react'
import { autorun, runInAction, observable } from 'mobx'
import CommonParam from '../game-setting/CommonParam'
import MobxKeysPressed from '../MobxKeysPressed'
import { initialize, get } from '../mobx-emitter-value'
import { useMemoOne } from 'use-memo-one'

const usePressEmitter = ({ data, context }: CommonParam<Data, Context>): EmitterData<[]> => {
  const [pauseEmitter] = useState<EmitterData<[]>>(new Set())
  const keysPressed = useLocalObservable(() => new MobxKeysPressed())
  const buttonPressed = useMemoOne(() => initialize(context, [false]), [context])
  const wasPreviouslyPressed = useLocalObservable(() => observable.box(false))

  useEffect(() => autorun(() => {
    const isPressed =
      get(buttonPressed)[0] ||
      [...data.keyBindings].some(key => keysPressed.keysPressed.has(key))
    if (!wasPreviouslyPressed.get() && isPressed) emit(pauseEmitter)
    runInAction(() => {
      wasPreviouslyPressed.set(isPressed)
    })
  }))

  return pauseEmitter
}

export default usePressEmitter
