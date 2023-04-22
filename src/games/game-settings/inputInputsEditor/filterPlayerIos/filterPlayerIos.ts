import Input from './Input'
import Output from './Output'

const filterPlayerIos = ({ playerIoType, playerIosPresetType }: Input): Output =>
  ([id, { playerIosPresetType: currentPlayerIosPresetType, ioType }]) =>
    (
      currentPlayerIosPresetType === playerIosPresetType ||
      currentPlayerIosPresetType === undefined
    ) &&
  ioType === playerIoType

export default filterPlayerIos
