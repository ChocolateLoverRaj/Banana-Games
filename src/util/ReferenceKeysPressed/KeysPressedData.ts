import { ObservableSet } from '../ObservableSet'

interface KeysPressedData {
  onKeyDown: (e: KeyboardEvent) => void
  onKeyUp: (e: KeyboardEvent) => void
  keysPressed: ObservableSet<string>
}

export default KeysPressedData
