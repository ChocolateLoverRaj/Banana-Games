import PlayerIo from '../../playerInput/PlayerIo'
import PlayerIoId from '../../gameWithSettings/PlayerIoId'

type Output = (playerIo: [PlayerIoId, PlayerIo<any, any>]) => void

export default Output
