import PlayerIoPreset from '../../gameWithSettings/PlayerIoPreset'
import PlayerIosPresetType from '../../PlayerIosPresetType'
import PresetOption from './PresetOption'

const getPresetOptions = (
  playerInputsPresets: readonly PlayerIoPreset[] | undefined,
  type: PlayerIosPresetType
): PresetOption[] | undefined =>
  playerInputsPresets
    ?.map(({ name, playerInputPresetType }, index) => ({ name, index, playerInputPresetType }))
    .filter(({ playerInputPresetType }) =>
      playerInputPresetType === type)

export default getPresetOptions
