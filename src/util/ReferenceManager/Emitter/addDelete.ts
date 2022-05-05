import { Listener } from 'emitter2'
import AddDelete from '../../AddDelete'
import { ReferenceManagerEmitter, add } from '.'
import deleteValue from './deleteValue'

const addDelete: AddDelete<ReferenceManagerEmitter<any, any>, Listener<any>> = {
  add,
  deleteValue
}

export default addDelete
