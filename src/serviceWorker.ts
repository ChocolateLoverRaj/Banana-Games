import ServiceWorkerMessages from './ServiceWorkerMessages'

self.addEventListener('install', (e: any) => {
  console.log('Service worker is here!')
  e.waitUntil(fetch('./stats.json')
    .then(async res => await res.json())
    .then(async stats => {
      console.log(stats)
      const appChunk = stats.chunks.find(({ names }) => names.includes('app'))
      console.log('app chunk', appChunk)
      const mainChunks = stats.chunks.filter(({ id }) => appChunk.siblings.includes(id))
      console.log('main chunks', mainChunks)
      const filesToCache = [
        './',
        ...[appChunk, ...mainChunks].flatMap(({ files }) => files)
      ]
      // Delete old caches
      await Promise.all((await caches.keys()).map(async key => await caches.delete(key)))
      // Add new cache
      const cache = (await caches.open(stats.hash))
      await cache.addAll(filesToCache)
      try {
        await cache.add('assets/favicon.ico')
      } catch (e) {
        console.warn("Couldn't load favicon", e)
      }
    }))
})

self.addEventListener('fetch', (e: any) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response ?? fetch(e.request)
    })
  )
})

self.addEventListener('message', e => {
  if (e.data === ServiceWorkerMessages.SKIP_WAITING) (self as any).skipWaiting()
})
