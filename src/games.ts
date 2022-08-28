import GameMeta from './types/GameMeta'

const games = import.meta.glob<GameMeta>('./games/*/meta.ts', { eager: true, import: 'default' })

export default games
