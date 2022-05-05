import { StartStop } from '..'
import Reaction from './Reaction'
import start from './start'
import stop from './stop'

const startStop: StartStop<Reaction> = { start, stop }

export default startStop
