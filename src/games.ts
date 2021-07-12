import Game from './types/Game'
import { dirname, normalize } from 'path'

const gamesContext = require.context('./games', true, /index\.json/)

const games = new Map<string, Game>(gamesContext.keys().map(k => [
  normalize(dirname(k)),
  gamesContext(k)
]))

export default games
