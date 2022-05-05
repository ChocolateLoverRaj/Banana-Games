import { StartStop } from '..'
import Reaction from './Reaction'
import start from './start'
import stop from './stop'

const startStop: StartStop<Reaction<unknown, unknown>> = { start, stop }

export default startStop
