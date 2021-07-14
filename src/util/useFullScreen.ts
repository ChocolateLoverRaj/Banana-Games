import {
  useState,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
  RefObject
} from 'react'
import never from 'never'
import usePromise from 'react-use-promise'
import PromiseState from '../types/PromiseState'

export enum FullScreenOperation { NONE, ENTERING, EXITING }

export type UseFullScreenResult = [
  fullScreen: boolean,
  setFullScreen: Dispatch<SetStateAction<boolean>>,
  operation: FullScreenOperation,
  /**
   * https://www.npmjs.com/package/react-use-promise#api
   */
  error: Error,
  /**
   * https://www.npmjs.com/package/react-use-promise#api
   */
  state: PromiseState
]

const useFullScreen = <T extends HTMLElement = HTMLElement>(ref: RefObject<T>): UseFullScreenResult => {
  // If the element is currently full screen
  const [fullScreen, _setFullScreen] = useState(false)
  // Update fullScreen if the browser exits it
  useEffect(() => {
    const handler = (): void => {
      _setFullScreen(document.fullscreenElement === ref.current)
    }
    document.addEventListener('fullscreenchange', handler)
    return () => document.removeEventListener('fullscreenchange', handler)
  }, [])
  // The current operation
  const [operation, setOperation] = useState(FullScreenOperation.NONE)
  // The promise to enter / exit full screen
  const [promise, setPromise] = useState(Promise.resolve())
  // Reset operation once promise is done
  useEffect(() => setOperation(FullScreenOperation.NONE), [promise])
  // Expose error and state of promise
  const [error, state] = usePromise(promise, []).slice(1) as
    [Error, PromiseState]
  // Actually make the element enter / exit full screen
  const setFullScreen = useCallback<Dispatch<SetStateAction<boolean>>>(value => _setFullScreen(wasFullScreen => {
    const willBeFullScreen = typeof value === 'function' ? value(wasFullScreen) : value
    if (!wasFullScreen && willBeFullScreen) {
      setOperation(FullScreenOperation.ENTERING)
      setPromise((ref.current ?? never('ref.current is null')).requestFullscreen())
    } else if (wasFullScreen && !willBeFullScreen) {
      setOperation(FullScreenOperation.EXITING)
      setPromise(document.exitFullscreen())
    }
    return willBeFullScreen
  }), [])
  return [fullScreen, setFullScreen, operation, error, state]
}

export default useFullScreen
