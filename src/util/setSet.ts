/**
 * Makes a set the same as another set. Not deep clone.
 * @returns `void` - Modifies `targetSet`.
 */
const setSet = <T>(targetSet: Set<T>, copySet: Set<T>): void => {
  targetSet.forEach(v => {
    if (!copySet.has(v)) targetSet.delete(v)
  })
  copySet.forEach(v => {
    if (!targetSet.has(v)) targetSet.add(v)
  })
}

export default setSet
