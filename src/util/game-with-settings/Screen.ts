import { Data } from '../mobx-emitter-value'
import ScreenEmitter from './ScreenEmitter'
import ScreenEnum from './ScreenEnum'

interface Screen {
  emitter: ScreenEmitter
  mobx: Data<[ScreenEnum]>
}

export default Screen
