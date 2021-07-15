import ServiceWorkerMessages from './ServiceWorkerMessages'
import diff from 'arr-diff'

const cacheName = 'v2'

self.addEventListener('install', (e: any) => {
  console.log('Service worker is here!')
  e.waitUntil(fetch('./stats.json')
    .then(async res => await res.json())
    .then(async stats => {
      console.log(stats)
      const filesToCache = stats.namedChunkGroups.app.assets.map(({ name }) => name) as string[]
      // Update cache
      const cache = (await caches.open(cacheName))
      const currentlyCached = (await cache.keys()).map(({ url }) => url)
      const filesToAdd = diff(filesToCache, currentlyCached)
      const filesToDelete = diff(currentlyCached, filesToCache)
      await Promise.all<unknown>([
        cache.addAll([...filesToAdd, /* cache index.html */'./']),
        cache.add('assets/favicon.ico').catch(e => console.warn("Couldn't load favicon", e)),
        ...filesToDelete.map(async file => await cache.delete(file))
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

self.addEventListener('message', e => {
  switch (e.data) {
    case ServiceWorkerMessages.SKIP_WAITING:
      (self as any).skipWaiting()
      break
    case ServiceWorkerMessages.GET_DOWNLOADED_GAMES:
      console.log('download time')
  }
})

self.addEventListener('activate', (e: any) => {
  // Delete old caches
  e.waitUntil(caches.keys().then(async keys => await Promise.all(keys
    .filter(key => key !== cacheName).map(async key => await caches.delete(key)))))
})
