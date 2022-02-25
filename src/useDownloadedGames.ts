import Retry from './types/Retry'
import { useCallback, useEffect, useState } from 'react'
import ServiceWorkerMessages from './ServiceWorkerMessages'
import games from './games'

export enum DownloadState { NONE, DOWNLOADING, DOWNLOADED, REMOVING }
export type DownloadedGames = Map<string, DownloadState>
export type ManageGame = (id: string) => void
export type ManageGameErrors = Map<string, Error>
export type ResetManageGame = (id: string) => void
export type UseDownloadedGamesResult = [
  downloadedGames: DownloadedGames | undefined,
  downloadedGamesError: Error | undefined,
  retry: Retry,
  downloadGame: ManageGame,
  downloadGameErrors: ManageGameErrors,
  resetDownloadGame: ResetManageGame,
  removeGame: ManageGame,
  removeGameErrors: ManageGameErrors,
  resetRemoveGame: ResetManageGame
]

const useDownloadedGames = (
  serviceWorker: ServiceWorker | undefined
): UseDownloadedGamesResult => {
  const postMessageAsync = useCallback(async <T extends unknown[]>(
    message: ServiceWorkerMessages,
    ...args: any[]
  ): Promise<T> =>
    await new Promise((resolve, reject) => {
      const messageChannel = new MessageChannel()
      messageChannel.port1.addEventListener('message', ({ data: [error, ...result] }) => {
        if (error !== undefined) reject(error)
        resolve(result)
      })
      messageChannel.port1.start()
      messageChannel.port1.addEventListener('messageerror', reject)
      serviceWorker?.postMessage([message, ...args], [messageChannel.port2])
    }), [serviceWorker])

  const getDownloadedGames = useCallback(async (): Promise<string[]> =>
    await postMessageAsync(ServiceWorkerMessages.GET_DOWNLOADED_GAMES), [postMessageAsync])
  const [downloadedGamesPromise, setDownloadedGamesPromise] = useState<Promise<string[]>>()
  const [downloadedGames, setDownloadedGames] = useState<string[]>()
  const [downloadedGamesError, setDownloadedGamesError] = useState<Error>()

  // Handle promise
  useEffect(() => {
    let canceled = false
    downloadedGamesPromise?.then(downloadedGames => {
      if (!canceled) setDownloadedGames(downloadedGames)
    }, error => {
      if (!canceled) setDownloadedGamesError(error)
    })
    return () => {
      canceled = true
    }
  }, [downloadedGamesPromise])

  const retry = useCallback<Retry>(() =>
    setDownloadedGamesPromise(getDownloadedGames()), [getDownloadedGames])

  // Load initially
  useEffect(retry, [retry])

  const [downloadGamePromises, setDownloadGamePromises] =
    useState<Map<string, Promise<void>>>(new Map())
  const [downloadGameErrors, setDownloadGamesErrors] = useState<ManageGameErrors>(new Map())

  useEffect(() => {
    let canceled = false
    downloadGamePromises.forEach((promise, id) => {
      const removePromise = (): void =>
        setDownloadGamePromises(new Map([...downloadGamePromises].filter(([k]) => k !== id)))
      promise.then(() => {
        if (!canceled) {
          removePromise()
          setDownloadedGames(downloadedGames => [...downloadedGames ?? [], id])
        }
      }, e => {
        if (!canceled) {
          removePromise()
          setDownloadGamesErrors(new Map([
            ...downloadGameErrors,
            [id, e]
          ]))
        }
      })
    })
    return () => {
      canceled = true
    }
  }, [downloadGamePromises])

  const resetDownloadGame = useCallback<ResetManageGame>(
    id => setDownloadGamesErrors(downloadGameErrors =>
      new Map([...downloadGameErrors].filter(([currentId]) => currentId !== id))),
    [])

  const downloadGame = useCallback<ManageGame>(id => {
    resetDownloadGame(id)
    setDownloadGamePromises(downloadGamePromises => new Map([
      ...downloadGamePromises,
      [id, postMessageAsync(ServiceWorkerMessages.DOWNLOAD_GAME, id).then(() => undefined)]
    ]))
  }, [postMessageAsync, resetDownloadGame])

  // Remove games
  const [removeGamePromises, setRemoveGamePromises] = useState(new Map<string, Promise<void>>())
  const [removeGameErrors, setRemoveGameErrors] = useState<ManageGameErrors>(new Map())
  useEffect(() => {
    let canceled = false
    removeGamePromises.forEach((promise, id) => {
      const removePromise = (): void =>
        setRemoveGamePromises(new Map([...removeGamePromises].filter(([k]) => k !== id)))
      promise.then(() => {
        if (!canceled) {
          removePromise()
          setDownloadedGames(downloadedGames =>
            [...downloadedGames ?? []].filter(currentId => currentId !== id))
        }
      }, e => {
        if (!canceled) {
          removePromise()
          setRemoveGameErrors(removeGameErrors => new Map([
            ...removeGameErrors,
            [id, e]
          ]))
        }
      })
    })
    return () => {
      canceled = true
    }
  }, [removeGamePromises])
  const resetRemoveGame = useCallback<ResetManageGame>(id => setRemoveGameErrors(
    removeGameErrors => new Map([...removeGameErrors].filter(([k]) => k !== id))), [])
  const removeGame = useCallback<ManageGame>(id => {
    resetDownloadGame(id)
    setRemoveGamePromises(removeGamePromises => new Map([
      ...removeGamePromises,
      [id, postMessageAsync(ServiceWorkerMessages.REMOVE_GAME, id).then(() => undefined)]
    ]))
  }, [resetDownloadGame, postMessageAsync])

  return [
    downloadedGames !== undefined
      ? new Map([...games.keys()].map(id => [id, downloadedGames.includes(id)
        ? DownloadState.DOWNLOADED
        : downloadGamePromises.has(id)
          ? DownloadState.DOWNLOADING
          : DownloadState.NONE]))
      : undefined,
    downloadedGamesError,
    retry,
    downloadGame,
    downloadGameErrors,
    resetDownloadGame,
    removeGame,
    removeGameErrors,
    resetRemoveGame
  ]
}

export default useDownloadedGames
