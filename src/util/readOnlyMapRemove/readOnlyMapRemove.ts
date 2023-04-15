import Input from './Input'

const readOnlyMapRemove = <K, V>({ map, key }: Input<K, V>): ReadonlyMap<K, V> => {
  const newMap = new Map([...map])
  newMap.delete(key)
  return newMap
}

export default readOnlyMapRemove
