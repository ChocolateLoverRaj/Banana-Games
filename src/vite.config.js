import react from '@vitejs/plugin-react'

/** @type {import('vite').UserConfig} */
export default {
  resolve: {
    alias: {
      assert: require.resolve('assert-browserify')
    }
  },
  define: {
    process: require('process/browser'),
    global: 'globalThis'
  },
  plugins: [react()],
  build: {
    sourcemap: true
  }
}
