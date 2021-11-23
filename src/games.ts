import GameMeta from './types/GameMeta'
import { dirname, normalize } from 'path'

const gamesContext = require.context('./games', true, /meta\.ts/)

const games = new Map<string, GameMeta>(gamesContext.keys().map(k => [
  normalize(dirname(k)),
  gamesContext(k).default
]))

export default games
