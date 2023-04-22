import PresetOption from '../PresetOption'

interface Props {
  presets: readonly PresetOption[] | undefined
  onChoose: (presetId: string) => void
}

export default Props
