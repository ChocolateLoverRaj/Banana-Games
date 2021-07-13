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
