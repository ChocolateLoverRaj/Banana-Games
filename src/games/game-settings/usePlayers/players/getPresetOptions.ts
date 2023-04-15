import PlayerIoPreset from '../../gameWithSettings/PlayerIoPreset'
import PlayerIosPresetType from '../../PlayerIosPresetType'
import PresetOption from './PresetOption'

const getPresetOptions = (
  playerInputsPresets: ReadonlyMap<string, PlayerIoPreset> | undefined,
  type: PlayerIosPresetType
): PresetOption[] | undefined =>
  playerInputsPresets !== undefined
    ? [...playerInputsPresets]
        ?.map(([id, { name, playerInputPresetType }]) => ({ name, id, playerInputPresetType }))
        .filter(({ playerInputPresetType }) =>
          playerInputPresetType === type)
    : undefined

export default getPresetOptions
