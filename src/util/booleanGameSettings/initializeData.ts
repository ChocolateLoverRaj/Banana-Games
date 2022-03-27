import Data from './Data'
import AbsolutePosition from '../types/AbsolutePosition'
import Size from '../types/Size'
import clone from 'rfdc/default'
import { ReactNode } from 'react'
import { makeObservable, observable } from 'mobx'

const initializeData = (
  name: string,
  defaultKeyBindings: Set<string>,
  buttonContent: ReactNode,
  defaultButtons: Array<AbsolutePosition & Size>): Data => {
  const data = {
    name,
    defaultKeyBindings,
    buttonContent,
    defaultButtons,
    keyBindings: new Set(defaultKeyBindings),
    screenRects: clone(defaultButtons)
  }
  makeObservable(data, {
    keyBindings: observable,
    screenRects: observable
  })
  return data
}

export default initializeData
