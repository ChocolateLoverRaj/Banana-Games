import PresetOption from '../PresetOption'

interface Props {
  presets: readonly PresetOption[] | undefined
  onChoose: (presetIndex: number) => void
}

export default Props
