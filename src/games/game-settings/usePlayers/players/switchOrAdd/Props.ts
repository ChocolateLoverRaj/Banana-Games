import Output from '../../Output'
import PresetOption from '../PresetOption'

interface Props {
  name: string
  id: number
  presets: PresetOption[] | undefined
  players: Output
}

export default Props
