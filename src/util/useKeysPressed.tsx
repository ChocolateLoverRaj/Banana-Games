import { useEffect, useState } from 'react'
import { Set } from 'immutable'

const useKeysPressed = (): Set<string> => {
  const [keysPressed, setKeysPressed] = useState(Set<string>())

  useEffect(() => {
    const handleKeyDown = ({ code }: KeyboardEvent): void => {
      setKeysPressed(keysPressed.add(code))
    }
    const handleKeyUp = ({ code }: KeyboardEvent): void => {
      setKeysPressed(keysPressed.delete(code))
    }
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  })

  return keysPressed
}

export default useKeysPressed
