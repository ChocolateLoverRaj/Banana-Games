import PromiseState from './types/PromiseState'
import Retry from './types/Retry'
import { useCallback, useEffect, useState } from 'react'
import usePromise from '.pnpm/react-use-promise@0.3.1_react@17.0.2/node_modules/react-use-promise'
import ServiceWorkerMessages from './ServiceWorkerMessages'

export enum DownloadState { NONE, DOWNLOADING, DOWNLOADED, REMOVING }
export type DownloadedGames = Map<string, DownloadState>
export type UseDownloadedGamesResult = [
  downloadedGames: DownloadedGames | undefined,
  downloadedGamesError: Error | undefined,
  downloadedGamesState: PromiseState,
  retry: Retry
]

const useDownloadedGames = (
  serviceWorker: ServiceWorker | undefined
): UseDownloadedGamesResult => {
  const getDownloadedGames = useCallback(async (): Promise<DownloadedGames> => {
    console.log(serviceWorker)
    serviceWorker?.postMessage(ServiceWorkerMessages.GET_DOWNLOADED_GAMES)
    // throw new Error('e')
  }, [serviceWorker])
  const [downloadedGamesPromise, setDownloadedGamesPromise] =
    useState<Promise<DownloadedGames | undefined>>(Promise.resolve(undefined))
  const [downloadedGames, downloadedGamesError, downloadedGamesState] =
    usePromise(downloadedGamesPromise, [downloadedGamesPromise])

  const retry = useCallback<Retry>(() => setDownloadedGamesPromise(getDownloadedGames()), [getDownloadedGames])

  // Load initially
  useEffect(retry, [retry])

  return [downloadedGames, downloadedGamesError, downloadedGamesState, retry]
}

export default useDownloadedGames
