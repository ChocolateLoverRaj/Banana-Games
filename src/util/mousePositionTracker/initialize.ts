import Data from './Data'

const initialize = (element: HTMLElement | Window = window): Data => {
  const data: Data = {
    element,
    handler: e => {
      data.e = e
    }
  }
  return data
}

export default initialize
