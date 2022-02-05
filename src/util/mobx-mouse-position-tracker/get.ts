import Data from './Data'

const get = (data: Data): MouseEvent | undefined => {
  data.atom.reportObserved()
  return data.e
}

export default get
