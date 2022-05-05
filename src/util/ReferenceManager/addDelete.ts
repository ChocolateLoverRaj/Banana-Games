import AddDelete from '../AddDelete'
import ReferenceManager from './ReferenceManager'
import reference from './reference'
import unReference from './unReference'

const addDelete: AddDelete<ReferenceManager<any>, any> = {
  add: referenceManager => reference(referenceManager),
  deleteValue: referenceManager => unReference(referenceManager)
}

export default addDelete
