import PresetOption from '../PresetOption'

interface Props {
  ioName: string
  id: number
  presets: PresetOption[] | undefined
  onAdd: (presetId: string) => void
}

export default Props
