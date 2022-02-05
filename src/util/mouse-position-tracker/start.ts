import Data from './Data'

const start = ({ element, handler }: Data): void => {
  element.addEventListener('mousemove', handler)
}

export default start
