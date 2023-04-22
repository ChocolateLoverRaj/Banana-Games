import { useEffect } from 'react'
import Input from './Input'

const useListenable = <T extends readonly unknown[]>({ listenable, listener }: Input<T>): void => {
  useEffect(() => {
    listenable?.add(listener)
    return () => listenable?.remove(listener)
  }, [listenable, listener])
}

export default useListenable
