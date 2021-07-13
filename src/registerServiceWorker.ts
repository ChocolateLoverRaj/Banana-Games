const registerServiceWorker = (): void => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./serviceWorker.bundle.js')
      .then((reg) => {
      // registration worked
        console.log('Registration succeeded. Scope is ' + reg.scope)
      }).catch((error) => {
      // registration failed
        console.error('Registration failed', error)
      })
  }

  // console.log(__webpack_chunk_load__('serviceWorker', console.log))
}

export default registerServiceWorker
