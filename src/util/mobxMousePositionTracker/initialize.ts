import Data from './Data'
import { action, createAtom } from 'mobx'

const initialize = (element: HTMLElement | Window = window): Data => {
  const listener = action((e: MouseEvent): void => {
    data.e = e
    data.atom.reportChanged()
  })
  const data: Data = {
    atom: createAtom(
      'Mouse Position Tracker',
      () => element.addEventListener('mousemove', listener),
      () => {
        element.removeEventListener('mousemove', listener)
        data.e = undefined
      }
    )
  }
  return data
}

export default initialize
