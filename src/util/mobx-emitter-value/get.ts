import Data from './Data'

const get = <T extends unknown[]>(data: Data<T>): T => {
  data.atom.reportObserved()
  return data.value
}

export default get
