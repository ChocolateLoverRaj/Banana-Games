import { MapChangeType } from '.'

interface MapChange<K> {
  type: MapChangeType.KEY_CHANGE
  key: K
}

export default MapChange
