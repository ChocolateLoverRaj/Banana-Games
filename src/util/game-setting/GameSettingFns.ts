import { ReactNode } from 'react'
import AbsolutePosition from '../types/AbsolutePosition'
import Size from '../types/Size'
import CommonParam from './CommonParam'
import GetSet from './GetSet'
import RenderScreenRectOptions from './RenderScreenRectOptions'

interface GameSettingFns<Data, Context> {
  getName: (param: CommonParam<Data, Context>) => string
  renderEdit: (param: CommonParam<Data, Context>) => ReactNode
  reset?: {
    isSameAsDefault: (param: CommonParam<Data, Context>) => boolean
    resetToDefault: (param: CommonParam<Data, Context>) => void
  }
  screenRects?: {
    getSet: GetSet<CommonParam<Data, Context>, Array<AbsolutePosition & Size>>
    render: (param: CommonParam<Data, Context>, options: RenderScreenRectOptions) =>
    ReactNode
  }
  save?: {
    getDbVersion: (param: CommonParam<Data, Context>) => number
    upgrade: (param: CommonParam<Data, Context>, previousVersion: number) => Promise<void>
    save: (param: CommonParam<Data, Context>) => Promise<void>
    load: (param: CommonParam<Data, Context>) => Promise<void>
  }
}

export default GameSettingFns
