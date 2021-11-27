import TouchButtons from './TouchButtons'

const getActionsPressed = <T extends string>(
  touchButtons: TouchButtons<T>,
  keysPressed: ReadonlySet<string>
): Set<T> => {
  const { buttonsPressed, actionInputs: { currentInputs } } = touchButtons

  return new Set([...[...currentInputs]
    .filter(([, keys]) => [...keys.keyboard].some(key => keysPressed.has(key)))
    .map(([action]) => action), ...buttonsPressed])
}

export default getActionsPressed
