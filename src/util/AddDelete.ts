interface AddDelete<T, Value> {
  add: (thingToAddValueTo: T, value: Value) => void
  deleteValue: (thingToDeleteValueFrom: T, val: Value) => void
}

export default AddDelete
