import { MapFn } from '.'

const mapMapValues = <Key, InputValue, OutputValue = InputValue>(
  map: Map<Key, InputValue>,
  mapFn: MapFn<Key, InputValue, OutputValue>
): Map<Key, OutputValue> => new Map([...map].map(([key, value]) => [key, mapFn(value, key, map)]))

export default mapMapValues
