import ServiceWorkerMessages from './ServiceWorkerMessages'
import diff from 'arr-diff'

const cacheName = 'v2'
interface Stats {
  app: string[]
  games: Map<string, string[]>
}

const requestToPromise = async <T>(request: IDBRequest<T>): Promise<T> =>
  await new Promise<T>((resolve, reject) => {
    request.addEventListener('error', () => reject(request.error))
    request.addEventListener('success', () => resolve(request.result))
  })

const storeName = 'Downloaded Games'
const getDb = async (): Promise<IDBDatabase> =>
  await new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open('Downloaded Games', 2)
    request.addEventListener('error', () => reject(request.error))
    request.addEventListener('upgradeneeded', ({ target: { result } }: any) => {
      const db = result as IDBDatabase
      db.createObjectStore(storeName)
    })
    request.addEventListener('success', () => resolve(request.result))
  })

const getCurrentlyCached = async (cache: Cache): Promise<string[]> =>
  (await cache.keys()).map(({ url }) => url)

const downloadAssetPromises = new Map<string, Promise<void>>()
const downloadAssets = async (
  assets: string[],
  cache: Cache | Promise<Cache> = caches.open(cacheName)
): Promise<void> => {
  const currentlyCached = await getCurrentlyCached(await cache)
  const filesToAdd = diff(assets, currentlyCached)
  await Promise.all(filesToAdd.map(async asset => {
    if (downloadAssetPromises.has(asset)) return await downloadAssetPromises.get(asset)
    const promise = (await cache).add(asset)
    downloadAssetPromises.set(asset, promise)
    return await promise
  }))
}

const fetchStats = async (): Promise<Stats> => {
  const { games, app } = await (await fetch('./stats.json')).json()
  return { app, games: new Map(Object.entries(games)) }
}

const resolveUrl = (url: string): string => new URL(url, location.href).toString()

const readGames = async (): Promise<string[]> => await getDb().then(async db =>
  await requestToPromise(db.transaction(storeName, 'readonly')
    .objectStore(storeName).getAllKeys())) as string[]

const readAndValidateGames = async (stats: Stats): Promise<string[]> =>
  await getDb().then(async db => {
    const games = await requestToPromise(db.transaction(storeName, 'readonly')
      .objectStore(storeName).getAllKeys())
    const isValid = (game: IDBValidKey): boolean =>
      typeof game === 'string' && stats.games.has(game)
    const brokenGames = games.filter(game => !isValid(game))
    if (brokenGames.length > 0) {
      const writeTransaction = db.transaction(storeName, 'readwrite')
      await Promise.all(brokenGames.map(async game =>
        await requestToPromise(writeTransaction.objectStore(storeName).delete(game))))
    }
    return games.filter(isValid) as string[]
  })

const getGameAssetsToDownload = async (games: string[], stats: Stats): Promise<string[]> => games
  .flatMap(game => (stats.games.get(game) as string[]).map(resolveUrl))

const specialFilesToCache = ['./', './stats.json'].map(resolveUrl)
const optionalFilesToCache = ['./assets/favicon.ico'].map(resolveUrl)
self.addEventListener('install', (e: any) => {
  console.log('Service worker is here!')
  e.waitUntil(fetchStats().then(async stats => {
    // Add new files to the cache
    const cache = (await caches.open(cacheName))
    await Promise.all<unknown>([
      downloadAssets(stats.app.map(resolveUrl), cache),
      cache.addAll(specialFilesToCache),
      cache.addAll(optionalFilesToCache).catch(e => console.warn("Couldn't load optional file", e)),
      getGameAssetsToDownload(await readGames(), stats).then(async assets =>
        await downloadAssets(assets, cache))
    ])
  }))
})

self.addEventListener('fetch', (e: any) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response ?? fetch(e.request)
    })
  )
})

const removeUnusedAssets = async (stats: Stats, usedGameAssets: string[]): Promise<void> => {
  const cache = (await caches.open(cacheName))
  const currentlyCached = await getCurrentlyCached(cache)
  const filesToDelete = diff(currentlyCached,
    stats.app.map(resolveUrl), usedGameAssets, specialFilesToCache, optionalFilesToCache)
  await Promise.all(filesToDelete.map(async file => await cache.delete(file)))
}

self.addEventListener('message', e => {
  const [type, ...args] = e.data
  const respond = <T extends unknown[]>(
    promise: Promise<T extends [] ? T | undefined : T>
  ): void => {
    promise.then(
      result => e.ports[0].postMessage([undefined, ...result ?? []]),
      error => e.ports[0].postMessage([error]))
  }
  switch (type) {
    case ServiceWorkerMessages.SKIP_WAITING:
      (self as any).skipWaiting()
      break
    case ServiceWorkerMessages.GET_DOWNLOADED_GAMES:
      respond((async () => {
        const db = await getDb()
        return await requestToPromise(db.transaction(storeName, 'readonly')
          .objectStore(storeName).getAllKeys())
      })())
      break
    case ServiceWorkerMessages.DOWNLOAD_GAME:
      respond<[]>((async () => {
        const [id] = args
        const assets = (await fetchStats()).games.get(id)
        console.log(assets)
        if (assets !== undefined) await downloadAssets(assets)
        else throw new Error(`No game with id: ${id as string}`)
        await requestToPromise((await getDb()).transaction(storeName, 'readwrite')
          .objectStore(storeName).add(undefined, id))
      })() as Promise<undefined>)
      break
    case ServiceWorkerMessages.REMOVE_GAME:
      respond<[]>((async () => {
        const [id] = args
        await requestToPromise((await getDb()).transaction(storeName, 'readwrite')
          .objectStore(storeName).delete(id))
        const stats = await fetchStats()
        console.log(await readAndValidateGames(stats))
        await removeUnusedAssets(stats, await getGameAssetsToDownload(
          await readGames(), stats))
      })() as Promise<undefined>)
  }
})

self.addEventListener('activate', (e: any) => {
  // Delete old caches
  e.waitUntil(caches.keys().then(async keys => await Promise.all(keys
    .filter(key => key !== cacheName).map(async key => await caches.delete(key)))))
  e.waitUntil(fetchStats().then(async stats => await removeUnusedAssets(
    stats, await getGameAssetsToDownload(await readAndValidateGames(stats), stats))))
})
