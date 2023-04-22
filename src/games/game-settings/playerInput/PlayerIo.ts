import PlayerIosPresetType from '../PlayerIosPresetType'
import PlayerIoType from '../PlayerIoType'
import RenderEdit from './renderEdit/RenderEdit'

interface PlayerIo<Data, TypeSpecific> {
  renderEdit: RenderEdit<Data>
  getDefaultData: () => Data
  name: string
  playerIosPresetType: PlayerIosPresetType | undefined
  ioType: PlayerIoType
  typeSpecific: TypeSpecific
}

export default PlayerIo
