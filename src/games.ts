import Game from './types/Game'
import importAll from './util/importAll'

const games = importAll(require.context('./games', true, /index\.json/)) as Game[]

export default games
