import { AddDelete } from '.'

const setAddDelete: AddDelete<Set<any>, any> = {
  add: (set, value) => set.add(value),
  deleteValue: (set, value) => set.delete(value)
}

export default setAddDelete
