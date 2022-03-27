import Data from './Data'

const stop = ({ element, handler }: Data): void => {
  element.removeEventListener('mousemove', handler)
}

export default stop
