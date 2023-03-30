import PresetOption from '../PresetOption'

interface Props {
  ioName: string
  id: number
  presets: PresetOption[] | undefined
  onAdd: (presetIndex: number) => void
}

export default Props
