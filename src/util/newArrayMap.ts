/**
 * Creates a new array with the inputted length and fills it using map fn
 * @param length Length of array
 * @param mapFn Function that creates array elements
 * @returns The array
 */
const newArrayMap = <T>(length: number, mapFn: (index: number) => T): T[] => {
  const arr = new Array<T>(length)
  for (let i = 0; i < length; i++) {
    arr[i] = mapFn(i)
  }
  return arr
}

export default newArrayMap
