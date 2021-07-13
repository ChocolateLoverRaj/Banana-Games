self.addEventListener('install', (e: any) => {
  console.log('Service worker is here!')
  e.waitUntil(fetch('./stats.json')
    .then(async res => await res.json())
    .then(async stats => {
      console.log(stats)
      const filesToCache = [
        './',
        ...stats.namedChunkGroups.app.assets.map(({ name }) => name)
      ]
      // Delete old caches
      await Promise.all((await caches.keys()).map(async key => await caches.delete(key)))
      // Add new cache
      await (await caches.open(stats.hash)).addAll(filesToCache)
    }))
})

self.addEventListener('fetch', (e: any) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response ?? fetch(e.request)
    })
  )
})
