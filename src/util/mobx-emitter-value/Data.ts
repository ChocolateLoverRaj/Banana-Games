import { IAtom } from 'mobx'

interface Data<T extends unknown[]> {
  atom: IAtom
  value: T
}

export default Data
