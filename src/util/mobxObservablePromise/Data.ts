import PromiseState from './PromiseState'
import { IAtom } from 'mobx'

interface Data<T> {
  state: PromiseState
  data: PromiseLike<T> | T | any
  atom: IAtom
}

export default Data
