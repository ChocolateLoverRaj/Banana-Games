type MapFn<Key, InputValue, OutputValue = InputValue> = (
  value: InputValue,
  key: Key,
  map: Map<Key, InputValue>
) => OutputValue

export default MapFn
