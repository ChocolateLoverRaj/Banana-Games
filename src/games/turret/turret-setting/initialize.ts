import AbsolutePosition from '../../../util/types/AbsolutePosition'
import Size from '../../../util/types/Size'
import Data from './Data'
import defaultControlType from './defaultControlType'
import switchTo from './switchTo'
import { makeObservable, observable } from 'mobx'

const initialize = (name: string, defaultJoystick: AbsolutePosition & Size): Data => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const data: Data = {
    name,
    defaultJoystick
  } as Data
  switchTo(data, defaultControlType)
  makeObservable(data, {
    controlType: observable,
    screenRects: observable
  })
  return data
}

export default initialize
