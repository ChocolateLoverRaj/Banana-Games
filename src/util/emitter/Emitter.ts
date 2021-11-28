export type Listener<T extends unknown[]> = (...params: T) => void

export class Emitter<T extends unknown[]> extends Set<Listener<T>> {
  emit (...params: T): void {
    this.forEach(listener => listener(...params))
  }
}
