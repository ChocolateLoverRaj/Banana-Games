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
import(/* webpackExports: "b" */ './test').then(console.log)
import(/* webpackExports: "meta" */ './test2').then(console.log)
import(/* webpackExports: "meta" */ './games/dynamic-aspect-ratio/test3').then(console.log)
import(/* webpackExports: "meta" */ './games/dynamic-aspect-ratio/test4').then(console.log)
import(/* webpackExports: "meta" */ './games/dynamic-aspect-ratio/test5').then(console.log)
import(/* webpackExports: "meta" */ './games/dynamic-aspect-ratio/test6').then(console.log)
import(/* webpackExports: "meta" */ './games/dynamic-aspect-ratio/test7').then(console.log)

const games = new Map<string, GameMeta>()
// const games = new Map<string, GameMeta>(gamesContext.keys().map(k => [
//   normalize(dirname(k)),
//   gamesContext(k).default
// ]))

export default games
