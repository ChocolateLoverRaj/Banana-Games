import { useReducer, ReducerWithoutAction } from 'react'

const reducer: ReducerWithoutAction<symbol> = () => Symbol('New Unique Value')

const useUnique = (): [symbol, () => void] => useReducer(reducer, Symbol('Original Unique Value'))

export default useUnique
