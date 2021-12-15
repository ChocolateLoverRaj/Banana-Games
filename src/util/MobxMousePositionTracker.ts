import { makeObservable, computed, action, createAtom } from 'mobx'

class MobxMousePositionTracker {
  _e?: MouseEvent

  readonly listener = action((e: MouseEvent): void => {
    this._e = e
    this.atom.reportChanged()
  })

  readonly atom = createAtom(
    MobxMousePositionTracker.name,
    () => this.element.addEventListener('mousemove', this.listener),
    () => {
      this.element.removeEventListener('mousemove', this.listener)
      this._e = undefined
    }
  )

  constructor (readonly element: HTMLElement | Window = window) {
    makeObservable(this, {
      e: computed
    })
  }

  get e (): MouseEvent | undefined {
    this.atom.reportObserved()
    return this._e
  }
}

export default MobxMousePositionTracker
