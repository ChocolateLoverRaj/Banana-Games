import { useEffect, useState, useCallback } from 'react'
import usePromise from 'react-use-promise'
import ServiceWorkerMessages from '../ServiceWorkerMessages'
import PromiseState from '../types/PromiseState'
import serviceWorkerSupported from './serviceWorkerSupported'

export type Retry = () => void
export type CheckForUpdates = () => void
export type ResetCheckForUpdates = () => void
export type Update = () => void
export type OnNoUpdatesFound = () => void

export type UseServiceWorkerResult = [
  registration: ServiceWorkerRegistration | undefined,
  registerError: Error | undefined,
  registrationState: PromiseState,
  retry: Retry,
  waiting: ServiceWorker | undefined,
  checkForUpdates: CheckForUpdates,
  checkForUpdatesError: Error | undefined,
  checkForUpdatesState: PromiseState,
  resetCheckForUpdates: ResetCheckForUpdates,
  update: Update
]

const useServiceWorker = (
  serviceWorkerUrl: string,
  onNoUpdatesFound: OnNoUpdatesFound
): UseServiceWorkerResult => {
  const [registerPromise, setRegisterPromise] = useState<Promise<ServiceWorkerRegistration | undefined>>(
    Promise.resolve(undefined))
  // TODO
  const [registration, registrationError, registrationState] =
    usePromise(registerPromise, [registerPromise])

  const retry = useCallback<Retry>(() => {
    if (serviceWorkerSupported) {
      setRegisterPromise(navigator.serviceWorker.register(serviceWorkerUrl))
    }
  }, [])

  useEffect(retry, [])

  const [installing, setInstalling] = useState<ServiceWorker>()

  // Handle updates
  useEffect(() => {
    const updateInstalling = (): void => setInstalling(registration?.installing ?? undefined)
    registration?.addEventListener('updatefound', updateInstalling)
    return () => registration?.removeEventListener('updatefound', updateInstalling)
  }, [registration])

  const [waiting, setWaiting] = useState<ServiceWorker>()
  const updateWaiting = useCallback(
    () => setWaiting(registration?.waiting ?? undefined),
    [registration]
  )

  // Update waiting right away
  useEffect(updateWaiting, [registration])

  // Handle new service worker
  useEffect(() => {
    installing?.addEventListener('statechange', updateWaiting)
    return () => installing?.removeEventListener('statechange', updateWaiting)
  }, [installing, updateWaiting])

  const [checkForUpdatesPromise, setCheckForUpdatesPromise] = useState(Promise.resolve(false))

  const checkForUpdates = useCallback(() => {
    if (registration !== undefined) setCheckForUpdatesPromise(registration.update().then(() => true))
  }, [registration])

  const [actuallyCheckedForUpdates, checkForUpdatesError, checkForUpdatesState] =
    usePromise(checkForUpdatesPromise, [checkForUpdatesPromise])

  const resetCheckForUpdates = useCallback(() => setCheckForUpdatesPromise(Promise.resolve(false)), [])

  // Notify on no updates found
  useEffect(() => {
    if (
      actuallyCheckedForUpdates === true &&
      registration !== undefined &&
      registration.installing === null
    ) onNoUpdatesFound()
  }, [registration, actuallyCheckedForUpdates])

  const update = useCallback<Update>(() => {
    if (waiting === undefined) throw new Error('Must have a waiting service worker to update')
    waiting.postMessage(ServiceWorkerMessages.SKIP_WAITING)
    window.location.reload()
  }, [waiting])

  return [
    registration,
    registrationError,
    registrationState,
    retry,
    waiting,
    checkForUpdates,
    checkForUpdatesError,
    checkForUpdatesState,
    resetCheckForUpdates,
    update
  ]
}

export default useServiceWorker
