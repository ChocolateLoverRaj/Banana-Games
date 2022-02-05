interface GetSet<P, T> {
  get: (param: P) => T
  set: (param: P, value: T) => void
}

export default GetSet
