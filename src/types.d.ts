import 'vite/client'

interface LazyCss {
  use: () => void
  unuse: () => void
}

declare module '*.lazy.css' {
  const lazyCss: LazyCss
  export default lazyCss
}

declare module '*.module.scss' {
  const classNames: Record<string, string>
  export default classNames
}
