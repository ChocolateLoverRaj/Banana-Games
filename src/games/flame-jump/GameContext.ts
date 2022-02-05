import { createContext, Context } from 'react'
import IGameContext from './IGameContext'

const GameRefContext = (createContext as Function)() as Context<IGameContext>

export default GameRefContext
