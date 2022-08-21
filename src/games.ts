import GameMeta from './types/GameMeta'
import { dirname, normalize, join } from 'path'

// const gamesContext = require.context('./games', true, /^\.\/[^/]*\/index\.[^/]*$/)

// console.log(
//   import(
//     /* webpackExports: ["meta"] */
//     /* webpackMode: "lazy" */
//     './games/dynamic-aspect-ratio/index')
// )

import(/* webpackExports: "meta" */ './games/dynamic-aspect-ratio/index').then(console.log)

const games = new Map<string, GameMeta>()
// const games = new Map<string, GameMeta>(gamesContext.keys().map(k => [
//   normalize(dirname(k)),
//   gamesContext(k).default
// ]))

export default games
