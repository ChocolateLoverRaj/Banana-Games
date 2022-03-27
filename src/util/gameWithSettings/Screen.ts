import { Data } from '../mobxEmitterValue'
import ScreenEmitter from './ScreenEmitter'
import ScreenEnum from './ScreenEnum'

interface Screen {
  emitter: ScreenEmitter
  mobx: Data<[ScreenEnum]>
}

export default Screen
