import SyncAsync from 'observables/lib/syncAsync/SyncAsync'
import GameSettingsData from '../GameSettingsData'
import Input from './Input'

interface Output {
  input: Input
  syncAsync: SyncAsync<GameSettingsData>
}

export default Output
