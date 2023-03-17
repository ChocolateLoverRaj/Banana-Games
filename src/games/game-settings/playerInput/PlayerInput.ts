import RenderEdit from './renderEdit/RenderEdit'

interface PlayerInput<T> {
  renderEdit: RenderEdit<T>
  getDefaultData: () => T
}

export default PlayerInput
