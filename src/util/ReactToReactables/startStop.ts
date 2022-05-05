import { ReactToReactablesReturnValue } from '.'
import { StartStop } from '..'
import start from './start'
import stop from './stop'

const startStop: StartStop<ReactToReactablesReturnValue> = { start, stop }

export default startStop
