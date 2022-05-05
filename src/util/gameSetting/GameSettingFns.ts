import { ReactNode } from 'react'
import AbsolutePosition from '../types/AbsolutePosition'
import Size from '../types/Size'
import CommonParam from './CommonParam'
import GetSet from './GetSet'
import RenderScreenRectOptions from './RenderScreenRectOptions'

interface GameSettingFns<Data, Context> {
  getName: (param: CommonParam<Data, Context>) => string
  /**
   * @returns If `param` is undefined, it should render a skeleton
   */
  renderEdit: (param: CommonParam<Data, Context> | undefined) => ReactNode
  reset?: {
    isSameAsDefault: (param: CommonParam<Data, Context>) => boolean
    resetToDefault: (param: CommonParam<Data, Context>) => void
  }
  screenRects?: {
    getSet: GetSet<CommonParam<Data, Context>, Array<AbsolutePosition & Size>>
    render: (param: CommonParam<Data, Context>, options: RenderScreenRectOptions) =>
    ReactNode
  }
}

export default GameSettingFns
