import Output from '../../Output'
import PresetOption from '../PresetOption'

interface Props {
  players: Output
  index: number
  presets: readonly PresetOption[] | undefined
}

export default Props
